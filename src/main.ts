import "./style.css";
import { volumes } from "./content";
import { makeCover } from "./covers";
import { createDetailBackground } from "./background";
import { createIcon } from "./icons";
import type { ShelfScene } from "./scene";
import type { ReaderScene } from "./reader";

function element<ElementType extends HTMLElement = HTMLElement>(id: string): ElementType {
  const result = document.getElementById(id);
  if (!result) throw new Error(`Missing page element: ${id}`);
  return result as ElementType;
}

const dialog = element<HTMLDialogElement>("detail");
const detailBackground = createDetailBackground(element("detail-background"));
const navigation = element("volume-nav");
const fallback = element("fallback");
const viewToggle = element<HTMLButtonElement>("view-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const covers = volumes.map((volume, index) => volume.cover || makeCover(volume, index).toDataURL("image/webp"));
let selected = 0;
let shelf: ShelfScene | undefined;
let listView = false;
let returnFocus: HTMLElement | null = null;
let reader: ReaderScene | undefined;
let readerLoading = false;
let readerUnavailable = false;
let readingSpread = -1;
let detailMotion: "idle" | "entering" | "switching" | "closing" | "browsing" = "idle";
let pendingClose = false;

function setDetailMotion(motion: typeof detailMotion) {
  detailMotion = motion;
  dialog.dataset.motion = motion;
  dialog.setAttribute("aria-busy", String(motion !== "idle"));
  element<HTMLButtonElement>("close-detail").disabled = motion === "closing";
  element("detail-copy").inert = motion !== "idle";
  updateReader();
}

async function animateCopy(entering: boolean, direction = 0) {
  const copy = element("detail-copy");
  copy.getAnimations().forEach((animation) => animation.cancel());
  const hidden = `translate(${direction * 24}px, ${entering ? 14 : -8}px)`;
  const animation = copy.animate(entering ? [{ opacity: 0, transform: hidden }, { opacity: 1, transform: "translate(0, 0)" }] : [{ opacity: 1, transform: "translate(0, 0)" }, { opacity: 0, transform: hidden }], { duration: reducedMotion.matches ? 0 : entering ? 560 : 360, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" });
  await animation.finished.catch(() => {});
  if (entering) animation.cancel();
}

async function finishDetailMotion() {
  setDetailMotion("idle");
  if (pendingClose) { pendingClose = false; await closeDetail(); }
}

async function scrollToReader() {
  const initialScroll = dialog.scrollTop;
  if (!initialScroll) return;
  if (reducedMotion.matches) { dialog.scrollTop = 0; return; }
  await new Promise<void>((resolve) => {
    const started = performance.now();
    function advance(time: number) {
      const progress = Math.min(1, (time - started) / 280);
      dialog.scrollTop = initialScroll * Math.pow(1 - progress, 3);
      if (progress < 1 && dialog.open) requestAnimationFrame(advance);
      else resolve();
    }
    requestAnimationFrame(advance);
  });
}

function updateReader() {
  const volume = volumes[selected];
  const busy = detailMotion !== "idle" || reader?.busy || false;
  if (reader) readingSpread = reader.spread;
  const closed = readingSpread < 0;
  const pages = volume.pages.slice(Math.max(0, readingSpread) * 2, Math.max(0, readingSpread) * 2 + 2);
  const motionLabels: Record<string, string> = { entering: "正在取出书本", switching: "正在切换书册", closing: "正在合书并返回", browsing: "正在翻到所选章节", "opening-cover": "正在翻开封面", "closing-cover": "正在合上书本", "turning-page": "正在翻页", "settling-page": "书页回落中" };
  element("reader-status").textContent = motionLabels[detailMotion] || motionLabels[reader?.action || ""] || (closed ? "封面" : `${readingSpread * 2 + 1}–${Math.min(readingSpread * 2 + 2, volume.pages.length)} / ${volume.pages.length} 页`);
  element("reader-hint").textContent = readerUnavailable ? "使用下方按钮翻阅书本" : closed ? "点击封面或「翻开书本」，开始阅读" : "点击左右书页 · 拖动页角 · 方向键翻页";
  element<HTMLButtonElement>("page-previous").disabled = busy || readingSpread <= 0;
  element<HTMLButtonElement>("page-next").disabled = busy || readingSpread >= Math.ceil(volume.pages.length / 2) - 1;
  element<HTMLButtonElement>("reader-toggle").disabled = busy;
  element("reader-toggle").textContent = closed ? "翻开书本" : "合上封面";
  const chapterSelect = element<HTMLSelectElement>("reader-chapter");
  chapterSelect.disabled = busy;
  chapterSelect.value = String(readingSpread);
  const chapterLinks = element("reader-links");
  chapterLinks.hidden = closed || !pages.some((page) => page.link);
  chapterLinks.inert = busy;
  chapterLinks.replaceChildren(...(closed ? [] : pages.flatMap((page) => page.link ? [createLink(page.link)] : [])));
  element("reader-stage").setAttribute("aria-busy", String(busy));
  element<HTMLButtonElement>("detail-previous").disabled = busy;
  element<HTMLButtonElement>("detail-next").disabled = busy;
  dialog.dataset.readerAction = reader?.action || "idle";
  element("reader-fallback").hidden = Boolean(reader);
  element("reader-stage").hidden = !reader;
  element<HTMLImageElement>("detail-cover").hidden = !closed;
  element("reader-paper").hidden = closed;
  function pageArticle(page: typeof pages[number], index: number) {
    const article = document.createElement("article");
    const heading = document.createElement("h3");
    heading.textContent = page.title;
    const body = document.createElement("p");
    body.textContent = page.body;
    if (page.eyebrow) {
      const eyebrow = document.createElement("p");
      eyebrow.className = "page-eyebrow";
      eyebrow.textContent = page.eyebrow;
      article.append(eyebrow);
    }
    article.append(heading);
    if (page.image) {
      const image = document.createElement("img");
      image.src = page.image.src;
      image.alt = page.image.alt;
      article.append(image);
    }
    article.append(body);
    if (page.link) article.append(createLink(page.link));
    article.setAttribute("aria-label", `第 ${Math.max(0, readingSpread) * 2 + index + 1} 页`);
    return article;
  }
  element("reader-transcript").replaceChildren(...(closed ? [] : pages.map(pageArticle)));
  element("reader-paper").replaceChildren(...pages.map(pageArticle));
  element("reader-transcript").parentElement!.hidden = closed || !reader;
}

async function selectChapter(target: number) {
  if (!dialog.open || detailMotion !== "idle" || reader?.busy || !Number.isInteger(target) || target < 0 || target >= Math.ceil(volumes[selected].pages.length / 2)) return;
  if (readingSpread === target) return;
  setDetailMotion("browsing");
  await scrollToReader();
  if (reader) {
    if (reader.spread < 0) { reader.turn(0); await reader.whenIdle(); }
    while (reader.spread !== target && !pendingClose) {
      const moved = reader.turn(reader.spread + Math.sign(target - reader.spread), 360);
      if (!moved) break;
      await reader.whenIdle();
    }
  } else readingSpread = target;
  await finishDetailMotion();
}

function turnPage(direction: number) {
  if (!dialog.open || detailMotion !== "idle" || reader?.busy) return;
  if (direction === 0) { updateReader(); return; }
  const next = readingSpread + direction;
  if (next < 0 || next >= Math.ceil(volumes[selected].pages.length / 2)) return;
  if (reader) reader.turn(next);
  else readingSpread = next;
  updateReader();
}

function fallBackReader() {
  reader?.dispose();
  reader = undefined;
  readerUnavailable = true;
  updateReader();
}

async function ensureReader() {
  if (reader || readerLoading || readerUnavailable) return;
  readerLoading = true;
  try {
    const { createReader } = await import("./reader");
    if (!dialog.open) return;
    element("reader-stage").hidden = false;
    reader = createReader(element("reader-stage"), turnPage, updateReader, fallBackReader);
    reader.select(volumes[selected], selected);
    updateReader();
  } catch {
    fallBackReader();
  } finally { readerLoading = false; }
}

function createLink(link: { label: string; href: string }, primary = false): HTMLAnchorElement {
  const anchor = document.createElement("a");
  anchor.textContent = `${link.label} ↗`;
  anchor.href = link.href;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.className = primary ? "primary-link" : "secondary-link";
  return anchor;
}

function updateSelection(index: number) {
  selected = (index + volumes.length) % volumes.length;
  const volume = volumes[selected];
  element("selected-number").textContent = `${String(selected + 1).padStart(2, "0")} / ${String(volumes.length).padStart(2, "0")}`;
  element("selected-title").textContent = volume.title;
  element("selected-summary").textContent = volume.subtitle;
  element("inspect").textContent = `展开 ${volume.title} ↗`;
  navigation.querySelectorAll("button").forEach((button, buttonIndex) => {
    if (buttonIndex === selected) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
  shelf?.select(selected, dialog.open);
}

function populateDetail() {
  const volume = volumes[selected];
  detailBackground.select(volume);
  element("detail-icon").replaceChildren(createIcon(volume.icon));
  const chapterSelect = element<HTMLSelectElement>("reader-chapter");
  const coverOption = new Option(`封面 · ${volume.pages.length} 页`, "-1");
  coverOption.disabled = true;
  chapterSelect.replaceChildren(coverOption, ...volume.pages.flatMap((page, pageIndex) => pageIndex % 2 === 0 ? [new Option(`${String(pageIndex / 2 + 1).padStart(2, "0")} / ${page.title}`, String(pageIndex / 2))] : []));
  element("detail-eyebrow").textContent = `VOLUME ${String(selected + 1).padStart(2, "0")} / PERSONAL COLLECTION`;
  element("detail-title").textContent = volume.title;
  element("detail-subtitle").textContent = volume.subtitle;
  element("detail-description").textContent = volume.description;
  element("detail-category").textContent = volume.category;
  element("detail-note").textContent = volume.note;
  element("detail-index").textContent = `${String(selected + 1).padStart(2, "0")} / ${String(volumes.length).padStart(2, "0")}`;
  element<HTMLImageElement>("detail-cover").src = covers[selected];
  element<HTMLImageElement>("detail-cover").alt = `${volume.title} 封面`;
  readingSpread = -1;
  element<HTMLDetailsElement>("reader-transcript-panel").open = false;
  reader?.select(volume, selected);
  updateReader();
  dialog.scrollTop = 0;
  const image = element<HTMLImageElement>("detail-image");
  image.hidden = !volume.image;
  if (volume.image) { image.src = volume.image.src; image.alt = volume.image.alt; }
  else image.removeAttribute("src");
  const links = element("detail-links");
  links.replaceChildren(...volume.links.map((link, index) => createLink(link, index === 0)));
  element("external-note").hidden = volume.links.length === 0;
  links.hidden = volume.links.length === 0;
}

async function openDetail(index: number, trigger?: HTMLElement) {
  if (detailMotion !== "idle") return;
  if (!dialog.open) returnFocus = trigger || (document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : element("inspect"));
  updateSelection(index);
  populateDetail();
  document.body.classList.add("detail-open");
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  shelf?.setVisible(false);
  reader?.setVisible(true);
  setDetailMotion("entering");
  if (!trigger) element("close-detail").focus();
  const copyEntrance = animateCopy(true);
  await ensureReader();
  await Promise.all([reader?.present(), copyEntrance]);
  await finishDetailMotion();
}

async function closeDetail() {
  if (!dialog.open || detailMotion === "closing") return;
  if (detailMotion !== "idle") { pendingClose = true; return; }
  setDetailMotion("closing");
  await scrollToReader();
  await Promise.all([reader?.dismiss(), animateCopy(false)]);
  shelf?.select(selected, false);
  shelf?.setVisible(!listView);
  document.body.classList.add("detail-returning");
  const animation = dialog.animate([{ opacity: 1 }, { opacity: 0 }], { duration: reducedMotion.matches ? 0 : 320, fill: "forwards" });
  await animation.finished.catch(() => {});
  dialog.close();
  animation.cancel();
}

async function switchVolume(direction: number) {
  if (detailMotion !== "idle" || reader?.busy) return;
  const wasReading = readingSpread >= 0;
  setDetailMotion("switching");
  await scrollToReader();
  await Promise.all([reader?.dismiss(-direction), animateCopy(false, -direction)]);
  updateSelection(selected + direction);
  populateDetail();
  await Promise.all([reader?.present(direction), animateCopy(true, direction)]);
  if (wasReading && !pendingClose) {
    if (reader) {
      reader.turn(0);
      await reader.whenIdle();
    } else readingSpread = 0;
  }
  await finishDetailMotion();
}

dialog.addEventListener("cancel", (event) => { event.preventDefault(); void closeDetail(); });
dialog.addEventListener("close", () => {
  detailBackground.reset();
  detailMotion = "idle";
  pendingClose = false;
  dialog.dataset.motion = "idle";
  dialog.setAttribute("aria-busy", "false");
  element<HTMLButtonElement>("close-detail").disabled = false;
  element("detail-copy").inert = false;
  element("detail-copy").getAnimations().forEach((animation) => animation.cancel());
  document.body.classList.remove("detail-open");
  document.body.classList.remove("detail-returning");
  shelf?.select(selected, false);
  shelf?.setVisible(!listView);
  reader?.setVisible(false);
  returnFocus?.focus({ preventScroll: true });
});
element("close-detail").addEventListener("click", closeDetail);
element("page-previous").addEventListener("click", () => turnPage(-1));
element("page-next").addEventListener("click", () => turnPage(1));
element("reader-chapter").addEventListener("change", (event) => { void selectChapter(Number((event.target as HTMLSelectElement).value)); });
element("reader-toggle").addEventListener("click", () => {
  if (detailMotion !== "idle" || reader?.busy) return;
  if (readingSpread < 0) turnPage(1);
  else {
    if (reader) reader.turn(-1);
    else readingSpread = -1;
    updateReader();
  }
});
element("previous").addEventListener("click", () => updateSelection(selected - 1));
element("next").addEventListener("click", () => updateSelection(selected + 1));
element("inspect").addEventListener("click", () => openDetail(selected, element("inspect")));
element("detail-previous").addEventListener("click", () => { void switchVolume(-1); });
element("detail-next").addEventListener("click", () => { void switchVolume(1); });

volumes.forEach((volume, index) => {
  const button = document.createElement("button");
  button.textContent = volume.title;
  button.setAttribute("aria-label", `选择 ${volume.title}`);
  button.addEventListener("click", () => updateSelection(index));
  navigation.append(button);
  const article = document.createElement("article");
  article.className = "fallback-card";
  article.style.setProperty("--cover-color", volume.color);
  const coverButton = document.createElement("button");
  coverButton.className = "fallback-cover";
  coverButton.setAttribute("aria-label", `展开 ${volume.title} 详情`);
  coverButton.setAttribute("aria-haspopup", "dialog");
  const cover = document.createElement("img");
  cover.src = covers[index];
  cover.alt = `${volume.title}：${volume.subtitle}`;
  coverButton.append(cover);
  coverButton.addEventListener("click", () => openDetail(index, coverButton));
  const title = document.createElement("h2");
  title.append(createIcon(volume.icon), document.createTextNode(volume.title));
  const subtitle = document.createElement("p");
  subtitle.textContent = volume.subtitle;
  const links = document.createElement("div");
  links.className = "fallback-links";
  links.append(...volume.links.map((link) => createLink(link)));
  if (volume.links.length === 0) links.textContent = `${volume.pages.length / 2} 个生活片段 · 翻阅书本`;
  article.append(coverButton, title, subtitle, links);
  fallback.append(article);
});

function setListView(value: boolean) {
  listView = value;
  document.body.classList.toggle("list-view", value);
  viewToggle.setAttribute("aria-pressed", String(value));
  viewToggle.textContent = !shelf ? "当前为列表视图" : value ? "切换为 3D 视图" : "切换为列表视图";
  shelf?.setVisible(!value);
}
viewToggle.addEventListener("click", () => setListView(!listView));
document.addEventListener("keydown", (event) => {
  if (event.altKey || event.metaKey || event.ctrlKey || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return;
  event.preventDefault();
  if (dialog.open) turnPage(event.key === "ArrowRight" ? 1 : -1);
  else updateSelection(selected + (event.key === "ArrowRight" ? 1 : -1));
});

function fallBackToList() {
  shelf?.dispose();
  shelf = undefined;
  document.body.classList.remove("scene-ready");
  document.body.classList.add("scene-unavailable");
  setListView(true);
  viewToggle.disabled = true;
  element("scene-note").textContent = "以列表浏览，所有入口同样可用。";
}

updateSelection(selected);
element("year").textContent = String(new Date().getFullYear());
if (reducedMotion.matches) setListView(true);

async function startScene() {
  try {
    const { createShelf } = await import("./scene");
    shelf = createShelf(element("scene"), volumes, (index) => openDetail(index), (direction) => updateSelection(selected + direction), fallBackToList);
    document.body.classList.add("scene-ready");
    shelf.select(selected, false);
    setListView(listView);
    element("scene-note").textContent = "点击封面展开 · 左右切换探索";
  } catch {
    fallBackToList();
  }
}

void startScene();
window.addEventListener("pagehide", () => { shelf?.setVisible(false); reader?.setVisible(false); });
window.addEventListener("pageshow", () => { shelf?.setVisible(!listView && !dialog.open); reader?.setVisible(dialog.open); });
