import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = { title: "Stories from Aarhus" };

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
