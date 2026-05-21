import { applyPrefs } from "./core/storage.js";
import { initHome } from "./pages/home.js";
import { initAnime } from "./pages/anime.js";
import { initAnimeSeries } from "./pages/anime-series.js";
import { initManga } from "./pages/manga.js";
import { initMangaReader } from "./pages/manga-reader.js";
import { initMusic } from "./pages/music.js";
import { initSettings } from "./pages/settings.js";

applyPrefs();

const page = document.body.dataset.page;
const map = {
  home: initHome,
  anime: initAnime,
  "anime-series": initAnimeSeries,
  manga: initManga,
  "manga-reader": initMangaReader,
  music: initMusic,
  settings: initSettings
};

map[page]?.().catch((e) => {
  console.error(e);
  const fallback = document.createElement("p");
  fallback.textContent = "Unable to load page data. Check your metadata paths.";
  document.querySelector("main")?.prepend(fallback);
});
