import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { Footer, Header } from "@/components";
import { Toaster } from "react-hot-toast";
import { auth } from "@/libs/auth";
import { SessionProvider } from "next-auth/react";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Exclusive - Best Online Shopping",
  description:
    "Discover top-quality products at unbeatable prices. Shop the latest trends in fashion, electronics, home essentials, and more—all in one place!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased flex flex-col h-screen`}
      >
        <SessionProvider session={session}>
          <Header />
          <main className="pt-[97px] flex-1">{children}</main>
          <Footer />
          <Toaster reverseOrder={false} />
        </SessionProvider>
      </body>
    </html>
  );
}
