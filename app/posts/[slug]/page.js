import { getPostBySlug } from "@/lib/wordpress";
import { formatDate } from "@/lib/format";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const image = post._embedded?.["wp:featuredmedia"]?.[0];
  const date = formatDate(post.date);

  return (
    <main>
      <article className={styles.post}>
        <Link href="/posts">← All posts</Link>
        {image && (
          <img
            className="featured-image"
            src={image.source_url}
            alt={image.alt_text}
          />
        )}
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
