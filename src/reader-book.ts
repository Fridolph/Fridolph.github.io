import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { ReadingPage, Volume } from "./content";
import { makeCover } from "./covers";

export function createReaderBook(volume: Volume, index: number, wake: () => void) {
  const group = new THREE.Group();
  const textures: THREE.Texture[] = [];
  let disposed = false;

  function textureFrom(canvas: HTMLCanvasElement) {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    textures.push(texture);
    return texture;
  }

  function drawWrapped(context: CanvasRenderingContext2D, text: string, startY: number, lineHeight: number) {
    let line = "";
    let positionY = startY;
    for (const character of text) {
      if (character === "\n" || context.measureText(line + character).width > 600) {
        context.fillText(line, 84, positionY);
        line = character === "\n" ? "" : character;
        positionY += lineHeight;
      } else line += character;
    }
    context.fillText(line, 84, positionY);
    return positionY;
  }

  function pageTexture(page: ReadingPage, pageIndex: number) {
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 1152;
    const context = canvas.getContext("2d")!;
    const texture = textureFrom(canvas);
    function paint(image?: HTMLImageElement) {
      context.fillStyle = "#eee6d2";
      context.fillRect(0, 0, 768, 1152);
      const shade = context.createLinearGradient(0, 0, 768, 0);
      shade.addColorStop(0, "#54452c22");
      shade.addColorStop(.12, "#ffffff00");
      shade.addColorStop(.88, "#ffffff00");
      shade.addColorStop(1, "#54452c18");
      context.fillStyle = shade;
      context.fillRect(0, 0, 768, 1152);
      context.fillStyle = volume.color;
      context.fillRect(84, 96, 38, 5);
      context.font = "18px Georgia, serif";
      context.fillText(`FRIDOLPH / ${volume.title.toUpperCase()}`, 84, 144);
      context.strokeStyle = "#85765b66";
      context.beginPath();
      context.moveTo(84, 180);
      context.lineTo(684, 180);
      context.stroke();
      context.fillStyle = "#645b49";
      context.font = "16px monospace";
      context.fillText(page.eyebrow || "PERSONAL NOTES", 84, 218);
      context.fillStyle = "#17231b";
      context.font = '40px "Songti SC", "Noto Serif SC", serif';
      const titleBottom = drawWrapped(context, page.title, 272, 62);
      let bodyY = titleBottom + 94;
      if (image) {
        const height = Math.min(300, 600 * image.naturalHeight / image.naturalWidth);
        const width = Math.min(600, height * image.naturalWidth / image.naturalHeight);
        context.drawImage(image, 84, bodyY - 30, width, height);
        bodyY += height + 32;
      }
      context.font = '30px "PingFang SC", "Microsoft YaHei", sans-serif';
      context.fillStyle = "#1d281e";
      drawWrapped(context, page.body, bodyY, 57);
      if (page.link) {
        context.fillStyle = "#66583e";
        context.fillRect(84, 946, 600, 1);
        context.font = '22px "PingFang SC", sans-serif';
        context.fillText(`${page.link.label} · 入口见书本下方`, 84, 986);
      }
      context.fillStyle = "#4a4e40";
      context.font = "18px Georgia, serif";
      context.fillText("A PERSONAL COLLECTION", 84, 1045);
      context.textAlign = "right";
      context.fillText(String(pageIndex + 1).padStart(2, "0"), 684, 1045);
      context.textAlign = "left";
      texture.needsUpdate = true;
      wake();
    }
    paint();
    if (page.image) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => { if (!disposed && image.naturalWidth) paint(image); };
      image.src = page.image.src;
    }
    return texture;
  }

  const pageTextures = volume.pages.map(pageTexture);
  const coverTexture = textureFrom(makeCover(volume, index));
  const cloth = new THREE.MeshStandardMaterial({ color: volume.color, roughness: .9 });
  const paper = new THREE.MeshStandardMaterial({ color: "#d9cdb2", roughness: .95 });
  const coverMaterial = new THREE.MeshStandardMaterial({ map: coverTexture, roughness: .82 });
  const boardGeometry = new RoundedBoxGeometry(1.5, 2.23, .07, 2, .02);
  const back = new THREE.Mesh(boardGeometry, cloth);
  back.position.set(.75, 0, -.1);
  group.add(back);
  const block = new THREE.Mesh(new THREE.BoxGeometry(1.43, 2.12, .14), paper);
  block.position.set(.725, 0, -.015);
  group.add(block);
  for (let lineIndex = 0; lineIndex < 12; lineIndex++) {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(1.43, .003, .001), paper);
    edge.position.set(.725, -1.061, -.075 + lineIndex * .011);
    edge.rotation.x = Math.PI / 2;
    group.add(edge);
  }
  const spine = new THREE.Mesh(new THREE.BoxGeometry(.065, 2.22, .23), cloth);
  spine.position.set(0, 0, -.035);
  group.add(spine);

  const hinge = new THREE.Group();
  hinge.position.z = .1;
  const coverBoard = new THREE.Mesh(boardGeometry, cloth);
  coverBoard.position.x = .75;
  const face = new THREE.Mesh(new THREE.PlaneGeometry(1.47, 2.2), coverMaterial);
  face.position.set(.75, 0, .036);
  hinge.add(coverBoard, face);
  group.add(hinge);

  const leftMaterial = new THREE.MeshStandardMaterial({ map: pageTextures[0], roughness: .94 });
  const rightMaterial = new THREE.MeshStandardMaterial({ map: pageTextures[1] || pageTextures[0], roughness: .94 });
  const left = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 2.1), leftMaterial);
  left.position.set(.72, 0, -.036);
  left.rotation.y = Math.PI;
  const right = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 2.1), rightMaterial);
  right.position.set(.72, 0, .063);
  hinge.add(left);
  group.add(right);

  const turnGeometry = new THREE.PlaneGeometry(1.42, 2.1, 36, 8);
  turnGeometry.translate(.71, 0, 0);
  const backGeometry = turnGeometry.clone();
  const backUV = backGeometry.attributes.uv;
  for (let vertex = 0; vertex < backUV.count; vertex++) backUV.setX(vertex, 1 - backUV.getX(vertex));
  const turnFrontMaterial = new THREE.MeshStandardMaterial({ roughness: .94, side: THREE.FrontSide });
  const turnBackMaterial = new THREE.MeshStandardMaterial({ roughness: .94, side: THREE.BackSide });
  const turning = new THREE.Group();
  turning.position.z = .15;
  turning.add(new THREE.Mesh(turnGeometry, turnFrontMaterial), new THREE.Mesh(backGeometry, turnBackMaterial));
  turning.visible = false;
  group.add(turning);

  if (volume.cover) {
    new THREE.TextureLoader().load(volume.cover, (texture) => {
      if (disposed) { texture.dispose(); return; }
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.push(texture);
      coverMaterial.map = texture;
      coverMaterial.needsUpdate = true;
      wake();
    }, undefined, () => {});
  }

  function setSpread(spread: number) {
    leftMaterial.map = pageTextures[spread * 2];
    rightMaterial.map = pageTextures[spread * 2 + 1] || pageTextures[spread * 2];
    leftMaterial.needsUpdate = true;
    rightMaterial.needsUpdate = true;
    turning.visible = false;
  }

  group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  turning.children.forEach((object) => { object.receiveShadow = false; object.frustumCulled = false; });

  return {
    group,
    setSpread,
    setCover(amount: number) {
      hinge.rotation.y = -Math.PI * amount;
      group.position.x = -.75 * (1 - amount);
      left.visible = amount > .01;
    },
    setTurn(from: number, to: number, progress: number) {
      const forward = to > from;
      const lower = Math.min(from, to);
      const angle = forward ? progress : 1 - progress;
      const lift = Math.sin(angle * Math.PI);
      leftMaterial.map = pageTextures[lower * 2];
      rightMaterial.map = pageTextures[(lower + 1) * 2 + 1] || pageTextures[(lower + 1) * 2];
      turnFrontMaterial.map = pageTextures[lower * 2 + 1];
      turnBackMaterial.map = pageTextures[(lower + 1) * 2];
      [leftMaterial, rightMaterial, turnFrontMaterial, turnBackMaterial].forEach((material) => { material.needsUpdate = true; });
      turning.visible = true;
      for (const geometry of [turnGeometry, backGeometry]) {
        const positions = geometry.attributes.position;
        const uvs = turnGeometry.attributes.uv;
        for (let vertex = 0; vertex < positions.count; vertex++) {
          const fraction = uvs.getX(vertex);
          const height = uvs.getY(vertex) - .5;
          const bend = -Math.PI * angle + lift * Math.sin(fraction * Math.PI) * .58 + lift * height * fraction * .12;
          positions.setX(vertex, fraction * 1.42 * Math.cos(bend));
          positions.setY(vertex, height * 2.1 + lift * Math.sin(fraction * Math.PI) * height * .055);
          positions.setZ(vertex, -fraction * 1.42 * Math.sin(bend) + lift * fraction * .035);
        }
        positions.needsUpdate = true;
        geometry.computeVertexNormals();
      }
    },
    dispose() {
      disposed = true;
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      group.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
    },
  };
}
