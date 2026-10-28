import Link from "next/link";
import { getPlaces } from "@/lib/wordpress";
import styles from "./page.module.css";
import { cacheLife } from "next/cache";

export default async function PlacesPage() {
  // Cache the page so navigation is instant – refreshes every hour
  "use cache";
  cacheLife("hours");

  const places = await getPlaces();

  return (
    <main>
      <h1>Places</h1>
      <ul className={styles.list}>
        {places.map((place) => {
          // Image is optional – only shown if the place has one
          const image = place._embedded?.["wp:featuredmedia"]?.[0];

          return (
            <li key={place.id} className={styles.card}>
              {image && <img src={image.source_url} alt={image.alt_text} />}
              <h2 dangerouslySetInnerHTML={{ __html: place.title.rendered }} />
              {place.acf?.by && <p>{place.acf.by}</p>}
              <Link href={`/places/${place.slug}`}>Read more</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
