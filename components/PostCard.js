import Link from "next/link";
import styles from "./PostCard.module.css";
import { formatDate } from "@/lib/format";

export default function PostCard({ post }) {
  const date = formatDate(post.date);

  return (
    <article className={styles.card}>
      <time className={styles.date} dateTime={post.date}>
        {date}
      </time>
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
