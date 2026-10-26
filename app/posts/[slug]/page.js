import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function PostPage({ params }) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}`,
  );
  // WordPress always returns an array, even for a single match
  const posts = await response.json();
  const post = posts[0];

  if (!post) {
    notFound();
  } // ← NY: luk if her

  const date = new Date(post.date).toLocaleDateString("en-GB", {
    // ← NY
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      <article className={styles.post}>
        <Link href="/posts">← All posts</Link>
        <time className={styles.date} dateTime={post.date}>
          {date}
        </time>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </main>
  );
} // ← luk funktionen
