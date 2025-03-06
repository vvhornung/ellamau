import localFont from "next/font/local";
import "./globals.css";
import Nav from "./nav";
import Footer from "./footer";
import ThemeClient from "./ThemeClient";
import StyledComponentsRegistry from "@/app/lib/StyledComponentsRegistry"; // Import registry
import { CartProvider } from "./contexts/CartContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <CartProvider>
            <ThemeClient>
              <div className={`${geistSans.variable} ${geistMono.variable}`}>
                <Nav />
                <main>{children}</main>
                <Footer />
              </div>
            </ThemeClient>
          </CartProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
