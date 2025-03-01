import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import { ubuntu } from "./components/fonts";
// import inter from "@/app/ui/fonts";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Acme",
  description: "Acme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${ubuntu.className} antialiased text-gray-400`}
      >
        {children}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <div>
            <small className=" text-gray-600">Built with</small>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="https://nextjs.org/icons/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
              />
            </a>
            <br />
            <small className="text-gray-600 mb-6">
              &copy; Copyright 12024, Starboy Inc.
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}
