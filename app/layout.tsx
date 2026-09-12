import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/components/provider";
import { Header, Footer } from "@/components/chrome";
export const metadata: Metadata = {
  title: "UB Fix — A better city starts with us",
  description:
    "Report, support, and track public infrastructure issues across Ulaanbaatar. Community-powered civic reporting.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
