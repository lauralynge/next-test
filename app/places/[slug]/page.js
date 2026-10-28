import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlaceBySlug } from "@/lib/wordpress";

export default async function PlacePage({ params }) {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  // Show 404 if the slug doesn't match a place
  if (!place) {
    notFound();
  }

  const image = place._embedded?.["wp:featuredmedia"]?.[0];
  const { by, adresse, anbefaling } = place.acf ?? {};

  return (
    <main>
      <article>
        <Link href="/places">← All places</Link>
        {image && <img src={image.source_url} alt={image.alt_text} />}
        <h1 dangerouslySetInnerHTML={{ __html: place.title.rendered }} />

        {/* ACF fields – each only shown if it has a value */}
        <ul className="meta">
          {by && (
            <li>
              <strong>By:</strong> {by}
            </li>
          )}
          {adresse && (
            <li>
              <strong>Addresse:</strong> {adresse}
            </li>
          )}
          {anbefaling && (
            <li>
              <strong>Must try:</strong> {anbefaling}
            </li>
          )}
        </ul>

        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: place.content.rendered }}
        />
      </article>
    </main>
  );
}
