import type { Volume } from "./content";

export function createDetailBackground(container: HTMLElement) {
  const compact = window.matchMedia("(max-width: 880px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current: Volume | undefined;
  let revision = 0;

  async function render() {
    const request = ++revision;
    const background = current?.background;
    container.dataset.volume = current?.id || "";
    container.dataset.state = background ? "loading" : "fallback";
    if (!background) { container.replaceChildren(); return; }
    const image = new Image();
    image.alt = "";
    image.decoding = "async";
    image.style.objectPosition = compact.matches ? background.mobilePosition || background.position || "center" : background.position || "center";
    image.src = compact.matches && background.mobileSrc ? background.mobileSrc : background.src;
    try {
      try { await image.decode(); }
      catch {
        if (image.getAttribute("src") === background.src || request !== revision) throw new Error("Background unavailable");
        image.src = background.src;
        await image.decode();
      }
      if (request !== revision) return;
      const previous = container.lastElementChild;
      if (previous) {
        previous.getAnimations().forEach((animation) => animation.cancel());
        container.replaceChildren(previous, image);
      } else container.replaceChildren(image);
      container.dataset.state = "ready";
      const fade = image.animate([{ opacity: 0 }, { opacity: 1 }], { duration: reducedMotion.matches ? 0 : 700, easing: "ease-out" });
      await fade.finished.catch(() => {});
      if (request === revision) container.replaceChildren(image);
    } catch {
      if (request !== revision) return;
      container.replaceChildren();
      container.dataset.state = "fallback";
    }
  }

  compact.addEventListener("change", () => { if (current) void render(); });
  return {
    select(volume: Volume) { current = volume; void render(); },
    reset() { current = undefined; revision++; container.replaceChildren(); container.dataset.state = "fallback"; },
  };
}
