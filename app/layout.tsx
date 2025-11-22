import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr Obe Charity Foundation | Rural Healthcare, Emergency Response & Youth Empowerment",
  description:
      "Dr Obe Charity Foundation provides mobile healthcare, emergency response training, CPR education, and community outreach across rural communities in Nigeria. Transforming lives through medical support and youth empowerment.",
  keywords: [
    "Dr Obe Charity Foundation",
    "Obe Foundation",
    "charity in Nigeria",
    "rural healthcare Nigeria",
    "CPR training Nigeria",
    "emergency response Nigeria",
    "mobile clinic Nigeria",
    "youth empowerment charity",
    "community health outreach",
    "health NGO Abuja",
    "nonprofit organization Nigeria",
  ],
  authors: [{ name: "Dr Obe Charity Foundation" }],
  creator: "Dr Obe Charity Foundation",
  publisher: "Dr Obe Charity Foundation",
  openGraph: {
    title: "Dr Obe Charity Foundation | Healthcare & Emergency Response Charity",
    description:
        "A medical charity dedicated to saving lives through rural healthcare, CPR training, emergency response, and community outreach in underserved communities.",
    url: "https://obefoundation4charity.org", // change to your real URL
    siteName: "Dr Obe Charity Foundation",
    images: [
      {
        url: "/og-image.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Dr Obe Charity Foundation - Healthcare and Charity Work",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Obe Charity Foundation",
    description:
        "Providing rural healthcare, emergency response, CPR training, and youth empowerment across Nigeria.",
    images: ["/og-image.png"],
    creator: "@obefoundation", // optional if you have a Twitter handle
  },
  metadataBase: new URL("https://obefoundation4charity.org"), // replace with your real domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:text-foreground selection:bg-purple-300/20`}
      >
        {children}

      </body>
    </html>
  );
}
