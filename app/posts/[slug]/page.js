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
  // ACF fields from WordPress
  const time = post.acf?.tid;
  const servings = post.acf?.portioner;

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
        {(time || servings) && (
          <ul className="meta">
            {time && (
              <li>
                <strong>Tid:</strong> {time}
              </li>
            )}
            {servings && (
              <li>
                <strong>Serveringer:</strong> {servings}
              </li>
            )}
          </ul>
        )}
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </main>
  );
} // ← luk funktionen
