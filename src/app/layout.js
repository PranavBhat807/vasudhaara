import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vasudhara - Shop for Beauty, Shop for Cause",
  description: "Modern E-Commerce Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="hNwTJhgrXX7HmhTPrzzCkOLfjhEqrOMIfxiEy07El5I" />
      </head>
      <body className={inter.className}>
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
