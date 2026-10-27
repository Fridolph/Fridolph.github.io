import type { Volume } from "./content";

const paths: Record<Volume["icon"], string> = {
  github: "M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.334-5.467-5.931 0-1.31.467-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.042.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.652.242 2.873.119 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.625-5.479 5.921.431.372.815 1.102.815 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.595 24 12.297c0-6.627-5.373-12-12-12",
  blog: "M4 3h13l3 3v15H4z M15 3v5h5 M8 11h8 M8 15h8 M8 18h5",
  resume: "M5 2h14v20H5z M12 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5 M8 15c0-4 8-4 8 0 M8 18h8",
  hobby: "M5 7h3l2-3h4l2 3h3a2 2 0 0 1 2 2v10H3V9a2 2 0 0 1 2-2 M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0",
  writing: "M4 21h5l12-12a2 2 0 0 0-5-5L4 16z M14 6l5 5 M4 16l5 5 M13 21h8",
  learning: "M2 8l10-5 10 5-10 5z M6 10v7q6 5 12 0v-7 M22 8v9",
};

export function drawCoverIcon(context: CanvasRenderingContext2D, icon: Volume["icon"]) {
  context.save();
  context.translate(-156, -156);
  context.scale(13, 13);
  const path = new Path2D(paths[icon]);
  context.lineWidth = 1.15;
  context.lineCap = "round";
  context.lineJoin = "round";
  if (icon === "github") context.fill(path);
  else context.stroke(path);
  context.restore();
}

export function createIcon(icon: Volume["icon"]): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("fill", icon === "github" ? "currentColor" : "none");
  if (icon !== "github") {
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
  }
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", paths[icon]);
  svg.append(path);
  return svg;
}
