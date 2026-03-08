import { useState, useEffect } from "react";

/**
 * Extracts the dominant color from an image using canvas.
 * Returns an RGB string like "120, 80, 200".
 */
export function useImageColor(src: string | undefined) {
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        // Sample a small version for performance
        canvas.width = 64;
        canvas.height = 64;
        ctx.drawImage(img, 0, 0, 64, 64);
        const data = ctx.getImageData(0, 0, 64, 64).data;

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 16) { // sample every 4th pixel
          const pr = data[i], pg = data[i + 1], pb = data[i + 2], pa = data[i + 3];
          if (pa < 128) continue; // skip transparent
          // Skip very dark and very light pixels for a more vibrant result
          const brightness = (pr + pg + pb) / 3;
          if (brightness < 30 || brightness > 230) continue;
          r += pr;
          g += pg;
          b += pb;
          count++;
        }
        if (count === 0) {
          setColor("128, 128, 128");
          return;
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        setColor(`${r}, ${g}, ${b}`);
      } catch {
        setColor("128, 128, 128");
      }
    };
  }, [src]);

  return color;
}

/**
 * Synchronous map of extracted colors, keyed by image src.
 * Uses a shared cache so each image is only processed once.
 */
const colorCache = new Map<string, string>();
const pendingCallbacks = new Map<string, Array<(c: string) => void>>();

export function extractImageColor(src: string): Promise<string> {
  if (colorCache.has(src)) return Promise.resolve(colorCache.get(src)!);

  return new Promise((resolve) => {
    if (pendingCallbacks.has(src)) {
      pendingCallbacks.get(src)!.push(resolve);
      return;
    }
    pendingCallbacks.set(src, [resolve]);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) { finish(src, "128, 128, 128"); return; }
        canvas.width = 64;
        canvas.height = 64;
        ctx.drawImage(img, 0, 0, 64, 64);
        const data = ctx.getImageData(0, 0, 64, 64).data;

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 16) {
          const pr = data[i], pg = data[i + 1], pb = data[i + 2], pa = data[i + 3];
          if (pa < 128) continue;
          const brightness = (pr + pg + pb) / 3;
          if (brightness < 30 || brightness > 230) continue;
          r += pr; g += pg; b += pb; count++;
        }
        if (count === 0) { finish(src, "128, 128, 128"); return; }
        finish(src, `${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)}`);
      } catch {
        finish(src, "128, 128, 128");
      }
    };
    img.onerror = () => finish(src, "128, 128, 128");
  });
}

function finish(src: string, color: string) {
  colorCache.set(src, color);
  const cbs = pendingCallbacks.get(src) || [];
  pendingCallbacks.delete(src);
  cbs.forEach((cb) => cb(color));
}
