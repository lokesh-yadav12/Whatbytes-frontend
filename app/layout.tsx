import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "WhatBytes E-Commerce",
  description: "Modern e-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" px-20 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
