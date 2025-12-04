import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '../styles/globals.css';

export const metadata = {
  title: "Chat'bruti – Chatbot inutile",
  description:
    "Chat'bruti, le chatbot le plus inutile de la Nuit de l'Info. Complètement à côté de la plaque, mais étrangement vivant."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
