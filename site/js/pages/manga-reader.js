import { loadJSON } from "../core/data.js";
import { getBookmark, setBookmark } from "../core/storage.js";

export async function initMangaReader() {
  const slug = new URLSearchParams(location.search).get("slug");
  const list = await loadJSON("assets/metadata/manga.json");
  const manga = list.find((item) => item.slug === slug) || list[0];
  document.getElementById("reader-title").textContent = manga.title;

  const pages = manga.pages || [];

  const content = document.getElementById("reader-content");
  const counter = document.getElementById("page-counter");
  const prev = document.getElementById("prev-page");
  const next = document.getElementById("next-page");
  const bookmark = document.getElementById("bookmark-btn");
  const maxIndex = Math.max(0, pages.length - 1);
  const clampIndex = (value) => Math.max(0, Math.min(value, maxIndex));

  let idx = clampIndex(getBookmark(manga.slug));

  const render = () => {
    const src = pages[idx];
    content.innerHTML = src ? `<img src="${src}" alt="${manga.title} page ${idx + 1}" loading="lazy" />` : `<p>No pages found. Add extracted images in metadata.</p>`;
    counter.textContent = `${pages.length ? idx + 1 : 0} / ${pages.length}`;
  };

  prev.addEventListener("click", () => {
    idx = clampIndex(idx - 1);
    render();
  });

  next.addEventListener("click", () => {
    idx = clampIndex(idx + 1);
    render();
  });

  bookmark.addEventListener("click", () => {
    setBookmark(manga.slug, idx);
    bookmark.textContent = "Saved";
    setTimeout(() => { bookmark.textContent = "Bookmark"; }, 900);
  });

  render();
}
