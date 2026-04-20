import type { Metadata } from "next";
import type { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "LiveTask | Главная",
};

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full flex">
      <div className="p-4">
        <Sidebar />
      </div>
      <div className="p-4 w-full">{children}</div>
    </div>
  );
}
