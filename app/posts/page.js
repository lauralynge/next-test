import { cacheLife } from "next/cache";

export default async function PostsPage() {
  "use cache";
  cacheLife("hours");

  const response = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts`
  );
  const posts = await response.json();
  console.log(posts);

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title.rendered}</li>
        ))}
      </ul>
    </main>
  );
}
