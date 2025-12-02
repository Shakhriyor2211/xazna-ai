import { Layout } from "@/providers/layout";
import { Sidebar } from "../navigation/sidebar";
import { Header } from "../navigation/header";

export function Main() {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Landing" />
      </div>
    </main>
  );
}
