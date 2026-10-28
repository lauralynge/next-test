// All fetch calls to WordPress are collected here, so the pages can reuse them

const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

// Posts
export async function getPosts() {
  const response = await fetch(`${API_URL}/posts?_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  const posts = await response.json();
  return posts;
}

export async function getLatestPosts() {
  const response = await fetch(`${API_URL}/posts?per_page=3&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  const posts = await response.json();
  return posts;
}

export async function getPostBySlug(slug) {
  const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  const posts = await response.json();
  return posts[0];
}

export async function getPageBySlug(slug) {
  const response = await fetch(`${API_URL}/pages?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  const pages = await response.json();
  return pages[0];
}


// Places (custom post type) – same pattern as posts
export async function getPlaces() {
  const response = await fetch(`${API_URL}/places?_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  return response.json();
}

export async function getPlaceBySlug(slug) {
  const response = await fetch(`${API_URL}/places?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  // WordPress returns an array – take the first match or null
  const places = await response.json();
  return places[0] ?? null;
}