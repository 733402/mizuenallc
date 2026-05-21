import { loadJSON } from "../core/data.js";
import { trackRow, shortcut } from "../core/components.js";

export async function initMusic() {
  const [tracks, playlists] = await Promise.all([
    loadJSON("assets/metadata/music.json"),
    loadJSON("assets/metadata/playlists.json")
  ]);

  const listEl = document.getElementById("track-list");
  const tabs = document.getElementById("playlist-tabs");
  const audio = document.getElementById("audio-player");
  const miniTitle = document.getElementById("mini-title");
  const miniArtist = document.getElementById("mini-artist");
  const miniCover = document.getElementById("mini-cover");
  const miniToggle = document.getElementById("mini-toggle");

  let currentList = tracks;
  let currentIdx = 0;

  const renderTracks = () => {
    listEl.innerHTML = currentList.map(trackRow).join("");
  };

  const playAt = (i) => {
    const track = currentList[i];
    if (!track) return;
    currentIdx = i;
    audio.src = track.file;
    miniTitle.textContent = track.title;
    miniArtist.textContent = `${track.artist} • ${track.album}`;
    miniCover.src = track.cover;
    audio.play().catch(() => {});
    miniToggle.textContent = "Pause";
  };

  tabs.innerHTML = playlists.map((p) => shortcut(p.name, "#")).join("");
  tabs.addEventListener("click", (e) => {
    const target = e.target.closest("a.shortcut");
    if (!target) return;
    e.preventDefault();
    const name = target.textContent;
    currentList = tracks.filter((t) => t.playlists.includes(name));
    currentIdx = 0;
    renderTracks();
  });

  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-track]");
    if (!btn) return;
    playAt(Number(btn.dataset.track));
  });

  miniToggle.addEventListener("click", () => {
    if (!audio.src) {
      playAt(currentIdx);
      return;
    }
    if (audio.paused) {
      audio.play();
      miniToggle.textContent = "Pause";
    } else {
      audio.pause();
      miniToggle.textContent = "Play";
    }
  });

  audio.addEventListener("ended", () => {
    const next = currentIdx + 1;
    if (next < currentList.length) playAt(next);
  });

  renderTracks();
}
