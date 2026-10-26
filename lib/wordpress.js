const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);
  const posts = await response.json();
  return posts;
}
export async function getLatestPosts() {
  const response = await fetch(`${API_URL}/posts?per_page=3`);
  const posts = await response.json();
  return posts;
}

export async function getPostBySlug(slug) {
  const response = await fetch(`${API_URL}/posts?slug=${slug}`);
  const posts = await response.json();
  return posts[0];
}

export async function getPageBySlug(slug) {
  const response = await fetch(`${API_URL}/pages?slug=${slug}`);
  const pages = await response.json();
  return pages[0];
}