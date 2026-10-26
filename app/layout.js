import "./globals.css";

export const metadata = { title: "Stories from Aarhus" };

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        {children}
      </body>
    </html>
  );
}