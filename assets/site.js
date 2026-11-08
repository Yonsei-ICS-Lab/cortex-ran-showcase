// CORTEX-RAN project showcase: a static page built from platform.json and projects.json.
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const [platform, projects] = await Promise.all([
  fetch("platform.json", { cache: "no-cache" }).then((r) => r.json()),
  fetch("projects.json", { cache: "no-cache" }).then((r) => r.json()),
]);
const filter = { platform: "" };

$("heroLab").textContent = platform.lab;
$("heroFull").textContent = platform.full_name;
$("heroTag").textContent = platform.tagline;
$("footLab").textContent = `${platform.name} · ${platform.lab}`;
// lab website (platform.json "lab_url"): the ICS Lab mark in the nav bar and the footer link
if (platform.lab_url) document.querySelectorAll(".lab-link").forEach((a) => { a.href = platform.lab_url; });
$("heroStats").innerHTML = [
  [projects.length, "projects"],
  [platform.platforms.map((p) => p.id).join(" / "), "platforms"],
].map(([v, k]) => `<div><b>${esc(v)}</b><span>${esc(k)}</span></div>`).join("");

$("papers").innerHTML = platform.papers.map((p) => `<li><b>${esc(p.title)}</b><br>${esc(p.authors)} · <span class="venue">${esc(p.venue)}</span>
  ${p.url ? ` · <a href="${esc(p.url)}" target="_blank" rel="noopener">DOI</a>` : ""}${p.arxiv ? ` · <a href="${esc(p.arxiv)}" target="_blank" rel="noopener">arXiv</a>` : ""}</li>`).join("");

const photo = platform.photo;
$("platformPhoto").hidden = !photo;
if (photo) {
  $("platformPhoto").innerHTML = `<img src="${esc(photo)}" alt="${esc(platform.photo_caption || "CORTEX-RAN testbed")}">`
    + (platform.photo_caption ? `<figcaption>${esc(platform.photo_caption)}</figcaption>` : "");
}
$("acronym").innerHTML = platform.acronym.map((w) => `
  <div class="acr">
    <div class="acr-letter">${esc(w.letter)}</div>
    <div><b>${esc(w.word)}</b><p>${esc(w.meaning)}</p></div>
  </div>`).join("");

function renderFilters() {
  const chip = (value, label) => `<button class="chip" data-v="${esc(value)}" aria-pressed="${filter.platform === value}">${label}</button>`;
  $("fPlat").innerHTML = chip("", "All") + platform.platforms.map((p) => chip(p.id, esc(p.id))).join("");
  document.querySelectorAll(".filters .chip").forEach((b) => b.addEventListener("click", () => {
    filter.platform = b.dataset.v;
    renderFilters();
    renderCards();
  }));
}

function renderCards() {
  const shown = projects.filter((p) => !filter.platform || p.platform === filter.platform);
  $("noMatch").hidden = shown.length > 0;
  $("cards").innerHTML = shown.map((p) => `<article class="cx-card card">
      <div class="card-hd">
        <div class="card-name">${p.title ? `<span class="card-proj">${esc(p.name)}</span><b>${esc(p.title)}</b>` : `<b>${esc(p.name)}</b>`}
          ${p.org ? `<span class="card-org">${esc(p.org)}</span>` : ""}</div>
      </div>
      <p class="card-sum">${esc(p.summary)}</p>
      <div class="tags"><span class="tag plat">${esc(p.platform)}</span></div>
      <div class="card-ft">
        <div class="links">
          ${p.video ? `<a href="${esc(p.video)}" target="_blank" rel="noopener">▶ Video</a>` : `<span class="off">▶ Video</span>`}
          ${p.paper ? `<a href="${esc(p.paper)}" target="_blank" rel="noopener">📄 Paper</a>` : `<span class="off">📄 Paper</span>`}
        </div>
      </div>
    </article>`).join("");
}

renderFilters();
renderCards();
