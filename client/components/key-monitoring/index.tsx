"use client";
import { KeyMonitoringTable } from "./table";
import { useParams } from "next/navigation";
import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/sidebar";

export function KeyMonitoring() {
  const { keyId } = useParams();

  console.log(keyId);

  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Key monitoring" />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto p-8 w-screen lg:w-full">
          <KeyMonitoringTable id={keyId as string} />
        </div>
      </div>
    </main>
  );
}
