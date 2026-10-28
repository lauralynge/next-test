import Link from "next/link";
import styles from "./PostCard.module.css";
import { formatDate } from "@/lib/format";

export default function PostCard({ post }) {
  // With ?_embed, WordPress includes the featured image and categories in _embedded
  const image = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = post._embedded?.["wp:term"]?.[0] ?? [];
  const date = formatDate(post.date);
  // ACF fields from WordPress – ?. prevents errors on posts without fields
  const time = post.acf?.tid;
  const servings = post.acf?.portioner;

  return (
    <article className={styles.card}>
      {image && (
        <img
          className={styles.image}
          src={image.source_url}
          alt={image.alt_text}
        />
      )}
      {categories.length > 0 && (
        <ul className={styles.categories}>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
      <time className={styles.date} dateTime={post.date}>
        {date}
      </time>
      {/* Only render the list if at least one field has a value */}
      {(time || servings) && (
        <ul className="meta">
          {time && <li>{time}</li>}
          {servings && <li>{servings}</li>}
        </ul>
      )}
      <h2
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className={styles.excerpt}
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <Link href={`/posts/${post.slug}`} className={styles.link}>
        Read more
      </Link>
    </article>
  );
}
