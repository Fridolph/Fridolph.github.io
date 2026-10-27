import * as THREE from "three";
import type { Volume } from "./content";
import { createReaderBook } from "./reader-book";

export function createReader(container: HTMLElement, onStep: (direction: number) => void, onIdle: () => void, onLost: () => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const canvas = renderer.domElement;
  container.append(canvas);
  const scene = new THREE.Scene();
  const presentation = new THREE.Group();
  scene.add(presentation);
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 30);
  camera.position.set(0, .25, 5.6);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xfff7df, 0x425a55, 2.4));
  const light = new THREE.DirectionalLight(0xffe9c6, 3);
  light.position.set(-3, 5, 7);
  light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  light.shadow.normalBias = .015;
  scene.add(light);
  const fill = new THREE.DirectionalLight(0xe7f5f1, 1);
  fill.position.set(4, 0, 3);
  scene.add(fill);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let book: ReturnType<typeof createReaderBook> | undefined;
  let frame = 0;
  let active = true;
  let disposed = false;
  let coverAmount = 0;
  let gesture: { id: number; startX: number; startY: number; hit: boolean; direction: number; progress: number } | null = null;
  let currentSpread = -1;
  let totalSpreads = 0;
  let transition: { started: number; duration: number; update: (progress: number) => void; resolve: () => void } | null = null;
  let operation: Promise<void> | null = null;
  let action = "idle";
  let hover = 0;
  let hoverTarget = 0;
  let hoverUntil = 0;
  let lastTime = 0;
  let cameraDistance = 4.5;
  let pageTurn: { from: number; to: number; progress: number } | null = null;

  function render(time: number) {
    frame = 0;
    if (!active || disposed || document.hidden || !book) return;
    const elapsedSeconds = Math.min((time - lastTime) / 1000 || .016, .05);
    lastTime = time;
    if (transition) {
      const elapsed = reducedMotion.matches ? 1 : Math.min(1, (time - transition.started) / transition.duration);
      transition.update(elapsed);
      if (elapsed === 1) {
        const resolve = transition.resolve;
        transition = null;
        resolve();
      }
    } else if (!operation && !gesture && currentSpread < 0) {
      hover = THREE.MathUtils.damp(hover, hoverTarget, 14, elapsedSeconds);
      book.setCover(coverAmount + hover * .035);
    }
    renderer.render(scene, camera);
    if (transition || time < hoverUntil) frame = requestAnimationFrame(render);
  }

  function wake() {
    if (active && !disposed && !frame) frame = requestAnimationFrame(render);
  }

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    cameraDistance = Math.max(4.5, 1.75 / (Math.tan(THREE.MathUtils.degToRad(17)) * camera.aspect));
    camera.position.z = cameraDistance;
    camera.updateProjectionMatrix();
    wake();
  }

  function smooth(progress: number) {
    return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
  }

  function animate(duration: number, update: (progress: number) => void) {
    if (disposed) return Promise.resolve();
    return new Promise<void>((resolve) => {
      transition = { started: performance.now(), duration, update, resolve };
      update(0);
      wake();
    });
  }

  function cancelGesture() {
    if (gesture && canvas.hasPointerCapture(gesture.id)) canvas.releasePointerCapture(gesture.id);
    gesture = null;
    book?.setSpread(Math.max(0, currentSpread));
    pageTurn = null;
  }

  function run(name: string, work: () => Promise<void>) {
    if (operation || disposed) return operation || Promise.resolve();
    action = name;
    hoverTarget = 0;
    operation = Promise.resolve().then(work).finally(() => {
      operation = null;
      action = "idle";
      if (!disposed) { wake(); onIdle(); }
    });
    onIdle();
    return operation;
  }

  async function turnCover(open: boolean) {
    if (!book || disposed) return;
    const initial = coverAmount + hover * .035;
    hover = 0;
    await animate(open ? 900 : 700, (progress) => {
      coverAmount = THREE.MathUtils.lerp(initial, open ? 1 : 0, smooth(progress));
      book!.setCover(coverAmount);
      camera.position.z = cameraDistance + Math.sin(progress * Math.PI) * .9;
      presentation.rotation.z = Math.sin(progress * Math.PI) * (open ? -.025 : .025);
      presentation.position.y = Math.sin(progress * Math.PI) * .035;
    });
    if (disposed) return;
    currentSpread = open ? 0 : -1;
    book.setSpread(0);
  }

  async function turnLeaf(to: number, initial = 0, duration = 1050, complete = true) {
    if (!book || disposed) return;
    const from = currentSpread;
    pageTurn = { from, to, progress: initial };
    await animate(Math.max(180, duration * (complete ? 1 - initial : initial)), (progress) => {
      const amount = THREE.MathUtils.lerp(initial, complete ? 1 : 0, smooth(progress));
      pageTurn = { from, to, progress: amount };
      book!.setTurn(from, to, amount);
      camera.position.z = cameraDistance + Math.sin(amount * Math.PI) * .9;
      presentation.rotation.z = Math.sin(progress * Math.PI) * (to > from ? -.018 : .018);
    });
    if (disposed) return;
    if (complete) currentSpread = to;
    pageTurn = null;
    book.setSpread(currentSpread);
  }

  async function closeBook() {
    cancelGesture();
    while (currentSpread > 0 && !disposed) await turnLeaf(currentSpread - 1, 0, 400);
    if (currentSpread >= 0 && !disposed) await turnCover(false);
  }

  async function moveBook(entering: boolean, direction = 0) {
    if (!book || disposed) return;
    const offset = direction ? direction * 1.75 : .22;
    const hiddenRotation = direction ? direction * -.32 : .28;
    await animate(entering ? 680 : 420, (progress) => {
      const amount = smooth(entering ? progress : 1 - progress);
      presentation.position.set(offset * (1 - amount), -.3 * (1 - amount) + Math.sin(progress * Math.PI) * .07, -.8 * (1 - amount));
      presentation.rotation.set(.08 * (1 - amount), hiddenRotation * (1 - amount), -.06 * (1 - amount));
      presentation.scale.setScalar(.62 + amount * .38);
      canvas.style.opacity = String(amount);
    });
  }

  function startTransition(to: number, initial = 0, duration = 1050) {
    if (!book || operation || to === currentSpread || to < -1 || to >= totalSpreads) return false;
    void run(to < 0 ? "closing-cover" : currentSpread < 0 ? "opening-cover" : "turning-page", async () => {
      if (to < 0) await closeBook();
      else if (currentSpread < 0) await turnCover(true);
      else await turnLeaf(to, initial, duration);
    });
    return true;
  }

  function hitBook(event: PointerEvent) {
    if (!book) return false;
    const bounds = canvas.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObject(book.group, true).some(({ object }) => {
      for (let parent: THREE.Object3D | null = object; parent; parent = parent.parent) if (!parent.visible) return false;
      return true;
    });
  }

  function onPointerDown(event: PointerEvent) {
    if (operation || !book || !event.isPrimary || event.button !== 0) return;
    gesture = { id: event.pointerId, startX: event.clientX, startY: event.clientY, hit: hitBook(event), direction: 0, progress: 0 };
    canvas.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent) {
    if (!gesture) {
      const target = event.pointerType !== "touch" && !operation && currentSpread < 0 && hitBook(event) ? 1 : 0;
      if (target !== hoverTarget) { hoverTarget = target; hoverUntil = performance.now() + 650; wake(); }
      return;
    }
    if (gesture.id !== event.pointerId || !gesture.hit || !book || operation) return;
    const distanceX = event.clientX - gesture.startX;
    const distanceY = event.clientY - gesture.startY;
    if (!gesture.direction && Math.abs(distanceX) > 12 && Math.abs(distanceX) > Math.abs(distanceY) * 1.2) gesture.direction = distanceX < 0 ? 1 : -1;
    const to = currentSpread + gesture.direction;
    if (currentSpread < 0 || !gesture.direction || to < 0 || to >= totalSpreads) return;
    gesture.progress = Math.min(.98, Math.max(0, distanceX * -gesture.direction) / Math.max(140, container.clientWidth * .5));
    pageTurn = { from: currentSpread, to, progress: gesture.progress };
    book.setTurn(currentSpread, to, gesture.progress);
    camera.position.z = cameraDistance + Math.sin(gesture.progress * Math.PI) * .9;
    wake();
  }

  function finishGesture(event: PointerEvent, cancel = false) {
    if (!gesture || gesture.id !== event.pointerId) return;
    const previousGesture = gesture;
    gesture = null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if (!previousGesture.hit || !book || operation) return;
    const distanceX = event.clientX - previousGesture.startX;
    const distanceY = event.clientY - previousGesture.startY;
    if (cancel || (previousGesture.progress > 0 && previousGesture.progress <= .16)) {
      if (pageTurn) void run("settling-page", () => turnLeaf(pageTurn!.to, previousGesture.progress, 1000, false));
      else { book.setSpread(Math.max(0, currentSpread)); wake(); }
      return;
    }
    if (previousGesture.progress > .16) {
      const to = currentSpread + previousGesture.direction;
      startTransition(to, previousGesture.progress);
      onStep(0);
      return;
    }
    if (Math.abs(distanceX) > 40 && Math.abs(distanceX) > Math.abs(distanceY)) {
      book.setSpread(Math.max(0, currentSpread));
      onStep(distanceX < 0 ? 1 : -1);
      wake();
      return;
    }
    book.setSpread(Math.max(0, currentSpread));
    wake();
    if (Math.hypot(distanceX, distanceY) > 12) return;
    const bounds = canvas.getBoundingClientRect();
    onStep(currentSpread < 0 || event.clientX > bounds.left + bounds.width / 2 ? 1 : -1);
  }

  function onVisibility() { if (!document.hidden) wake(); }
  function onContextLost(event: Event) { event.preventDefault(); onLost(); }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", (event) => finishGesture(event));
  canvas.addEventListener("pointercancel", (event) => finishGesture(event, true));
  canvas.addEventListener("pointerleave", () => { hoverTarget = 0; hoverUntil = performance.now() + 650; wake(); });
  canvas.addEventListener("webglcontextlost", onContextLost);
  document.addEventListener("visibilitychange", onVisibility);
  reducedMotion.addEventListener("change", wake);

  return {
    select(volume: Volume, index: number) {
      cancelGesture();
      if (book) { presentation.remove(book.group); book.dispose(); }
      book = createReaderBook(volume, index, wake);
      book.group.rotation.set(-.1, -.08, -.025);
      presentation.add(book.group);
      currentSpread = -1;
      totalSpreads = Math.ceil(volume.pages.length / 2);
      coverAmount = 0;
      book.setCover(0);
      book.setSpread(0);
      resize();
    },
    turn(to: number, duration = 1050) { return startTransition(to, 0, duration); },
    whenIdle() { return operation || Promise.resolve(); },
    present(direction = 0) { return run("entering", () => moveBook(true, direction)); },
    async dismiss(direction = 0) {
      if (operation) await operation;
      if (disposed) return;
      return run("leaving", async () => { await closeBook(); await moveBook(false, direction); });
    },
    get spread() { return currentSpread; },
    get busy() { return Boolean(operation); },
    get action() { return action; },
    setVisible(visible: boolean) { active = visible; if (visible) resize(); },
    dispose() {
      disposed = true;
      transition?.resolve();
      transition = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", wake);
      book?.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}

export type ReaderScene = ReturnType<typeof createReader>;
