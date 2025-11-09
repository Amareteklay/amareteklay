type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | { [className: string]: any };

/** Tiny clsx-style helper */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const push = (x: ClassValue) => {
    if (!x) return;
    if (typeof x === "string" || typeof x === "number") return out.push(String(x));
    if (Array.isArray(x)) return x.forEach(push);
    if (typeof x === "object") {
      for (const k in x) if (Object.prototype.hasOwnProperty.call(x, k) && x[k]) out.push(k);
    }
  };

  inputs.forEach(push);
  return out.join(" ");
}
