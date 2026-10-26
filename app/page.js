import { getLatestPosts } from "@/lib/wordpress";
import Link from "next/link";
import PostList from "@/components/PostList";
import styles from "./page.module.css";

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <main>
      <section className={styles.hero}>
        <h1>Stories from Aarhus</h1>
        <p>
          City walks, food and places worth a visit. The content is written in
          WordPress and presented with Next.js.
        </p>
      </section>

      <section>
        <h2 className={styles.heading}>Latest posts</h2>
        <PostList posts={posts} />
        <p className={styles.more}>
          <Link href="/posts">See all posts →</Link>
        </p>
      </section>
    </main>
  );
}
