import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProductHub - Your One-Stop Shop",
  description: "Discover amazing products and manage your inventory with ease",
  keywords: [
    "ProductHub",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "E-commerce",
  ],
  authors: [{ name: "ProductHub Team" }],
  openGraph: {
    title: "ProductStore",
    description: "Your one-stop destination for quality products",
    url: "https://productstore.com",
    siteName: "ProductStore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProductStore",
    description: "Your one-stop destination for quality products",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}