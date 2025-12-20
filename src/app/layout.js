import { Providers } from "./providers";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Vasudhara - Shop for Beauty, Shop for Cause",
  description: "Modern E-Commerce Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Header />
            <main className="min-h-screen">
              {children}
            </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
