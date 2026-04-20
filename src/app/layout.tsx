import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "./(root)/components/Providers";

import "./globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "LiveTask",
  description:
    "Платформа, где каждая задача — это живой объект. Идеально подходит для удаленных команд, которым важна визуализация присутствия коллег на доске и мгновенный отклик интерфейса.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
