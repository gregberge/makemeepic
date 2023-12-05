export function decode(str: string): string {
  return atob(str.replace(/\-/g, "+").replace(/_/g, "/"));
}

export function encode(str: string): string {
  return btoa(str).replace(/\//g, "_").replace(/\+/g, "-").replace(/=+$/, "");
}
