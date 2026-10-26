"use client";

export default function Error({ retry }) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>We could not fetch the content from WordPress.</p>
      <button onClick={() => retry()}>Try again</button>
    </main>
  );
}
