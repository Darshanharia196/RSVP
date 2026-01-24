import { Playfair_Display, Montserrat, Noto_Sans_Gujarati } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-noto-gujarati",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "The Wedding",
  description: "RSVP to our special day",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} ${notoGujarati.variable}`}>
        {children}
      </body>
    </html>
  );
}
