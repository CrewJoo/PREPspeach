import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Inter instead of Geist
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThinkPREP - 면접의 뼈대",
  description: "AI 면접관과 함께하는 논리적인 PREP 스피치 트레이닝",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
