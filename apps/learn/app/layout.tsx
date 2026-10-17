import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Tanisten Edu", description: "Geschlossene Programmier-Lernplattform" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
