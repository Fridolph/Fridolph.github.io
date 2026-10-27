import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { Volume } from "./content";
import { makeCover } from "./covers";

export interface ShelfScene {
  select(index: number, detail: boolean): void;
  setVisible(visible: boolean): void;
  dispose(): void;
}

export function createShelf(container: HTMLElement, volumes: Volume[], onOpen: (index: number) => void, onSwipe: (direction: number) => void, onLost: () => void): ShelfScene {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  container.append(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 80);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const spacing = 1.95;
  let selected = 0;
  let detailOpen = false;
  let active = true;
  let disposed = false;
  let frame = 0;
  let lastTime = 0;
  let hovering = -1;
  let pointerStart: { coordX: number; coordY: number } | null = null;
  let animationUntil = performance.now() + 1800;

  function shelfPosition(index: number) {
    return ((index - selected + volumes.length + 2) % volumes.length - 2) * spacing;
  }

  scene.add(new THREE.HemisphereLight(0xfff2d7, 0x3b5557, 2.5));
  const keyLight = new THREE.DirectionalLight(0xffe7c4, 3.8);
  keyLight.position.set(-4, 7, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  Object.assign(keyLight.shadow.camera, { left: -15, right: 15, top: 8, bottom: -8 });
  keyLight.shadow.normalBias = .025;
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0x8dc4c6, 1.8);
  fillLight.position.set(8, 2, 3);
  scene.add(fillLight);

  const ownedTextures: THREE.Texture[] = [];
  const textureLoader = new THREE.TextureLoader();
  const books = volumes.map((volume, index) => {
    const group = new THREE.Group();
    const coverTexture = new THREE.CanvasTexture(makeCover(volume, index));
    coverTexture.colorSpace = THREE.SRGBColorSpace;
    coverTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
    ownedTextures.push(coverTexture);
    const cloth = new THREE.MeshStandardMaterial({ color: volume.color, roughness: .85 });
    const paper = new THREE.MeshStandardMaterial({ color: "#dcd2bb", roughness: .95 });
    const front = new THREE.MeshStandardMaterial({ map: coverTexture, roughness: .8 });
    const cover = new THREE.Mesh(new RoundedBoxGeometry(1.45, 2.18, .09, 2, .025), cloth);
    cover.position.z = .13;
    const back = cover.clone();
    back.position.z = -.13;
    const pages = new THREE.Mesh(new THREE.BoxGeometry(1.37, 2.08, .2), paper);
    pages.position.x = .015;
    const face = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 2.15), front);
    face.position.z = .179;
    const binding = new THREE.Mesh(new THREE.BoxGeometry(.075, 2.18, .27), cloth);
    binding.position.x = -.69;
    group.add(cover, back, pages, face, binding);
    group.position.set(shelfPosition(index), 0, 0);
    group.rotation.y = -.1;
    group.userData.index = index;
    group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.userData.index = index;
      }
    });
    scene.add(group);
    if (volume.cover) {
      textureLoader.load(volume.cover, (texture) => {
        if (disposed) { texture.dispose(); return; }
        texture.colorSpace = THREE.SRGBColorSpace;
        ownedTextures.push(texture);
        front.map = texture;
        front.needsUpdate = true;
        wake();
      }, undefined, () => {});
    }
    return group;
  });

  const shelfMaterial = new THREE.MeshStandardMaterial({ color: "#25332f", roughness: .75, metalness: .1 });
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(30, .11, 2.6), shelfMaterial);
  shelf.position.set(5, -1.18, -.45);
  shelf.receiveShadow = true;
  scene.add(shelf);
  const shelfEdge = new THREE.Mesh(new THREE.BoxGeometry(30, .015, .025), new THREE.MeshStandardMaterial({ color: "#a7976e", roughness: .6, metalness: .5 }));
  shelfEdge.position.set(5, -1.17, .86);
  scene.add(shelfEdge);

  function render(time: number) {
    frame = 0;
    if (!active || disposed || document.hidden) return;
    const elapsed = Math.min((time - lastTime) / 1000 || .016, .05);
    lastTime = time;
    const blend = reducedMotion.matches ? 1 : 1 - Math.exp(-elapsed * 8);
    const mobile = container.clientWidth < 760;
    camera.position.set(0, detailOpen ? .5 : .9, mobile && !detailOpen ? 6.3 : 8.8);
    camera.lookAt(0, detailOpen ? .05 : -.04, 0);
    books.forEach((book, index) => {
      const selectedBook = index === selected;
      const detailPosition = mobile ? 0 : -1.8;
      const positionX = detailOpen && selectedBook ? detailPosition : shelfPosition(index);
      const positionY = detailOpen && selectedBook ? .08 : selectedBook ? .09 : index === hovering ? .08 : 0;
      const positionZ = detailOpen && selectedBook ? .8 : selectedBook ? .22 : 0;
      const scale = detailOpen && selectedBook ? (mobile ? .95 : 1.2) : 1;
      if (Math.abs(book.position.x - positionX) > spacing * (volumes.length - 2)) book.position.x = positionX;
      book.position.x = THREE.MathUtils.lerp(book.position.x, positionX, blend);
      book.position.y = THREE.MathUtils.lerp(book.position.y, positionY, blend);
      book.position.z = THREE.MathUtils.lerp(book.position.z, positionZ, blend);
      book.rotation.y = THREE.MathUtils.lerp(book.rotation.y, detailOpen && selectedBook ? -.23 : -.11, blend);
      book.scale.lerp(new THREE.Vector3(scale, scale, scale), blend);
      book.visible = !detailOpen || selectedBook;
    });
    shelf.visible = !detailOpen;
    shelfEdge.visible = !detailOpen;
    renderer.render(scene, camera);
    if (time < animationUntil) frame = requestAnimationFrame(render);
  }

  function wake() {
    animationUntil = performance.now() + (reducedMotion.matches ? 0 : 1500);
    if (!frame && active && !disposed) frame = requestAnimationFrame(render);
  }

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    wake();
  }

  function intersect(event: PointerEvent): number {
    const bounds = canvas.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(books, true)[0]?.object.userData.index ?? -1;
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    const nextHover = intersect(event);
    if (nextHover !== hovering) {
      hovering = nextHover;
      canvas.style.cursor = hovering >= 0 ? "pointer" : "default";
      wake();
    }
  }

  function onPointerDown(event: PointerEvent) {
    pointerStart = { coordX: event.clientX, coordY: event.clientY };
  }

  function onPointerUp(event: PointerEvent) {
    if (!pointerStart) return;
    const differenceX = event.clientX - pointerStart.coordX;
    const differenceY = event.clientY - pointerStart.coordY;
    pointerStart = null;
    if (Math.abs(differenceX) > 45 && Math.abs(differenceX) > Math.abs(differenceY)) {
      onSwipe(differenceX < 0 ? 1 : -1);
      return;
    }
    if (Math.hypot(differenceX, differenceY) > 12) return;
    const index = intersect(event);
    if (index >= 0) onOpen(index);
  }

  function onVisibility() { if (!document.hidden) wake(); }
  function onContextLost(event: Event) { event.preventDefault(); onLost(); }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", () => { pointerStart = null; });
  canvas.addEventListener("webglcontextlost", onContextLost);
  document.addEventListener("visibilitychange", onVisibility);
  reducedMotion.addEventListener("change", wake);
  resize();

  return {
    select(index, detail) { selected = index; detailOpen = detail; wake(); },
    setVisible(visible) { active = visible; if (visible) resize(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", wake);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
          objectMaterials.forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      ownedTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
      canvas.remove();
    },
  };
}
