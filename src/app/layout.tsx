import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Zero EXIF - Remove Metadata from Images",
  description:
    "A simple utility to remove EXIF metadata from your images, right in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} antialiased`}>{children}</body>
    </html>
  );
}
