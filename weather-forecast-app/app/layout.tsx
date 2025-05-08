import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather-Forecast-App",
  description: "Developed by Arunadevi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html style={{height:"100%"}} lang="en" love-deals="879BC0364EB9EBEE3DBE71B15E175613">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        data-new-gr-c-s-check-loaded="14.1234.0"
        data-gr-ext-installed=""
      >
        {children}
      </body>
    </html>
  );
}
