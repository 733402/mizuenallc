export function card(item, href) {
  return `<a class="card" href="${href}" aria-label="${item.title}">
    <img src="${item.cover}" alt="${item.title} cover" loading="lazy" />
    <div class="card-body">
      <p class="card-title">${item.title}</p>
      <p class="card-sub">${item.sub || item.type || ""}</p>
    </div>
  </a>`;
}

export function shortcut(label, href) {
  return `<a href="${href}" class="shortcut">${label}</a>`;
}

export function episodeRow(ep, i) {
  return `<li class="list-item"><span>${i + 1}. ${ep.title}</span><button class="btn" data-ep="${i}">Play</button></li>`;
}

export function trackRow(track, i) {
  return `<li class="list-item"><span>${track.title} • ${track.artist}</span><button class="btn" data-track="${i}">Play</button></li>`;
}
