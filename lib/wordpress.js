const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts?_embed`);
  const posts = await response.json();
  return posts;
}
export async function getLatestPosts() {
  const response = await fetch(`${API_URL}/posts?per_page=3&_embed`);
  const posts = await response.json();
  return posts;
}

export async function getPostBySlug(slug) {
  const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
  const posts = await response.json();
  return posts[0];
}

export async function getPageBySlug(slug) {
  const response = await fetch(`${API_URL}/pages?slug=${slug}&_embed`);
  const pages = await response.json();
  return pages[0];
}