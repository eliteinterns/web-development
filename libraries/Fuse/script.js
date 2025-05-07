let data = [];
let fuse;

async function loadData() {
  const res = await fetch('data.json');
  data = await res.json();

  populateCategoryFilter(data);

  fuse = new Fuse(data, {
    keys: ['title', 'description'],
    threshold: 0.3,
    includeMatches: true
  });

  applySearchAndFilter(); // show all cards by default
}

function populateCategoryFilter(data) {
  const categories = [...new Set(data.map(item => item.category))];
  const dropdown = document.getElementById('categoryFilter');

  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    dropdown.appendChild(opt);
  });
}

function highlightMatch(text, matches, key) {
  if (!matches) return text;

  const match = matches.find(m => m.key === key);
  if (!match) return text;

  let result = '';
  let lastIndex = 0;

  match.indices.forEach(([start, end]) => {
    result += text.slice(lastIndex, start);
    result += `<span class="highlight">${text.slice(start, end + 1)}</span>`;
    lastIndex = end + 1;
  });

  result += text.slice(lastIndex);
  return result;
}

function renderCards(results) {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  results.forEach(({ item, matches }) => {
    const title = highlightMatch(item.title, matches, 'title');
    const description = highlightMatch(item.description, matches, 'description');

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      <small>Category: ${item.category}</small>
    `;
    container.appendChild(card);
  });

  if (results.length === 0) {
    container.innerHTML = '<p>No results found.</p>';
  }
}

function applySearchAndFilter() {
  const query = document.getElementById('search').value.trim();
  const selectedCategory = document.getElementById('categoryFilter').value;

  let results;

  if (query) {
    results = fuse.search(query);
  } else {
    // show full dataset with format like Fuse.js result
    results = data.map(item => ({ item, matches: [] }));
  }

  if (selectedCategory) {
    results = results.filter(({ item }) => item.category === selectedCategory);
  }

  renderCards(results);
}

// Event Listeners
document.getElementById('search').addEventListener('input', applySearchAndFilter);
document.getElementById('categoryFilter').addEventListener('change', applySearchAndFilter);

// Initial load
loadData();