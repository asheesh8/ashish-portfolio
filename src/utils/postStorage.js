const KEY = 'ashish_blog_posts';

export function loadAllPosts() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

export function getPost(slug) {
  return loadAllPosts().find(p => p.slug === slug) || null;
}

export function getPublishedPosts() {
  return loadAllPosts().filter(p => p.published);
}

export function savePost(post) {
  const all = loadAllPosts();
  const idx = all.findIndex(p => p.slug === post.slug);
  const now = new Date().toISOString();
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...post, updatedAt: now };
  } else {
    all.unshift({ ...post, createdAt: now, updatedAt: now });
  }
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function deletePost(slug) {
  const all = loadAllPosts().filter(p => p.slug !== slug);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function formatDateDisplay(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return iso; }
}
