import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/Toast";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Güllap Yazılım - Modern Yazılım Çözümleri",
  description: "Modern teknolojiler ile masaüstü, web ve mobil yazılım çözümleri geliştiriyoruz. Profesyonel yazılım hizmetleri için iletişime geçin.",
  authors: [{ name: "Güllap Yazılım" }],
  creator: "Güllap Yazılım",
  publisher: "Güllap Yazılım",
  keywords: ["yazılım", "web geliştirme", "mobil uygulama", "masaüstü yazılım", "yazılım şirketi"],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  openGraph: {
    title: "Güllap Yazılım - Modern Yazılım Çözümleri",
    description: "Modern teknolojiler ile masaüstü, web ve mobil yazılım çözümleri geliştiriyoruz.",
    siteName: "Güllap Yazılım",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    title: "Güllap Yazılım - Modern Yazılım Çözümleri",
    description: "Modern teknolojiler ile masaüstü, web ve mobil yazılım çözümleri geliştiriyoruz.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = "#2563EB";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-green-400`}
      >
        <div className="min-h-screen flex flex-col relative">
          <Header />
          <main className="flex-1 relative">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </div>
        <Script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js" />
      </body>
    </html>
  );
}
