import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function Layout({
  title,
  children,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <main className="flex h-svh">
      <Sidebar />
      <div className="flex-1">
        <Header title={title} />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
