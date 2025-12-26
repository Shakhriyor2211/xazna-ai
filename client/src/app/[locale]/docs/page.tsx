import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/sidebar";

export default function DocsPage() {
  return (
    <main className="flex h-svh">
      <Sidebar />
      <div className="flex-1">
        <Header title={"Docs"} />
      </div>
    </main>
  );
}
