// Catch a search, fetch Wikimedia Commons images, then render cards.
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");
const count = document.getElementById("result-count");
const emptyState = document.getElementById("empty-state");
let latestSearch = 0;

async function fetchImages(query) {
  const url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    "&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size&iiurlwidth=600&format=json&origin=*";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Image search failed: " + response.status);
  const data = await response.json();
  if (data.error) throw new Error(data.error.info);
  return Object.values(data.query?.pages || {})
    .filter(item => item.imageinfo?.[0]?.thumburl || item.imageinfo?.[0]?.url)
    .sort((a, b) => (a.index || 0) - (b.index || 0));
}

function render(items, query) {
  results.innerHTML = "";
  items.forEach(item => {
    const info = item.imageinfo[0];
    const title = item.title.replace(/^File:/, "").replace(/_/g, " ");
    const card = document.createElement("article");
    card.className = "image-card";
    const link = document.createElement("a");
    link.href = info.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Open full image: " + title);
    const image = document.createElement("img");
    image.src = info.thumburl || info.url;
    image.alt = title;
    image.loading = "lazy";
    image.decoding = "async";
    const caption = document.createElement("h3");
    caption.textContent = title;
    const dimensions = document.createElement("p");
    dimensions.className = "image-meta";
    dimensions.textContent = info.width && info.height
      ? info.width + " × " + info.height + " px · Open image ↗"
      : "Open full image ↗";
    link.appendChild(image);
    link.appendChild(caption);
    link.appendChild(dimensions);
    card.appendChild(link);
    results.appendChild(card);
  });
  emptyState.hidden = true;
  count.textContent = "Showing " + items.length + " results for “" + query + "”";
  if (!items.length) count.textContent += " — try another topic.";
}

async function search(query) {
  query = query.trim();
  if (!query) return;
  const searchId = ++latestSearch;
  results.innerHTML = "";
  emptyState.hidden = true;
  count.textContent = "Searching for “" + query + "”…";
  try {
    const items = await fetchImages(query);
    // A slower earlier request must not replace the latest search.
    if (searchId !== latestSearch) return;
    render(items, query);
  } catch (error) {
    if (searchId !== latestSearch) return;
    count.textContent = "Could not load images. Please try searching again.";
    console.error(error);
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  search(input.value);
});

["nature", "architecture", "ocean"].forEach(topic => {
  document.getElementById("suggest-" + topic).addEventListener("click", () => {
    input.value = topic;
    search(input.value);
  });
});
