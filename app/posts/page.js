import { getPosts } from "@/lib/wordpress";
import PostList from "@/components/PostList";
import { cacheLife } from "next/cache";

export default async function PostsPage() {
  "use cache";
  cacheLife("hours");

const posts = await getPosts();

  return (
    <main>
      <h1>Posts</h1>
      <PostList posts={posts} />
    </main>
  );
}
