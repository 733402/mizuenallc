import { loadJSON } from "../core/data.js";
import { getBookmark, setBookmark } from "../core/storage.js";

async function pagesFromCBZ(path) {
  if (!window.JSZip) return [];
  const blob = await fetch(path).then((r) => r.blob());
  const zip = await window.JSZip.loadAsync(blob);
  const files = Object.keys(zip.files)
    .filter((n) => /\.(png|jpe?g|webp)$/i.test(n))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return Promise.all(files.map(async (name) => URL.createObjectURL(await zip.files[name].async("blob"))));
}

export async function initMangaReader() {
  const slug = new URLSearchParams(location.search).get("slug");
  const list = await loadJSON("assets/metadata/manga.json");
  const manga = list.find((item) => item.slug === slug) || list[0];
  document.getElementById("reader-title").textContent = manga.title;

  let pages = manga.pages || [];
  if (manga.cbz) {
    const cbzPages = await pagesFromCBZ(manga.cbz);
    if (cbzPages.length) pages = cbzPages;
  }

  const content = document.getElementById("reader-content");
  const counter = document.getElementById("page-counter");
  const prev = document.getElementById("prev-page");
  const next = document.getElementById("next-page");
  const bookmark = document.getElementById("bookmark-btn");

  let idx = Math.min(getBookmark(manga.slug), Math.max(pages.length - 1, 0));

  const render = () => {
    const src = pages[idx];
    content.innerHTML = src ? `<img src="${src}" alt="${manga.title} page ${idx + 1}" loading="lazy" />` : `<p>No pages found. Add extracted images or a CBZ in metadata.</p>`;
    counter.textContent = `${Math.min(idx + 1, pages.length)} / ${pages.length}`;
  };

  prev.addEventListener("click", () => {
    idx = Math.max(0, idx - 1);
    render();
  });

  next.addEventListener("click", () => {
    idx = Math.min(Math.max(pages.length - 1, 0), idx + 1);
    render();
  });

  bookmark.addEventListener("click", () => {
    setBookmark(manga.slug, idx);
    bookmark.textContent = "Saved";
    setTimeout(() => { bookmark.textContent = "Bookmark"; }, 900);
  });

  render();
}
