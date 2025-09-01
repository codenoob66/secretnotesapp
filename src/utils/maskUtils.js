export function maskTitle(rawTitle) {
  if (!rawTitle) {
    return "";
  }

  const decoded = new DOMParser().parseFromString(rawTitle, "text/html").body
    .textContent;

  const cleaned = decoded.replace(/&/g, "").replace(/\s+/g, "").slice(0, 10);

  return cleaned.split("").join("$");
}
