import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Fahndung BW",
  description: "Aktuelle Fahndungen in Baden-Württemberg",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <header className="border-b">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
              <Link href="/" className="text-xl font-bold">
                Fahndung BW
              </Link>
              <div>
                <Link href="/admin" className="text-sm font-medium">
                  Admin Dashboard
                </Link>
              </div>
            </nav>
          </header>
          <main className="min-h-screen">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
