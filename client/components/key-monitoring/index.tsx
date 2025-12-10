"use client";
import { KeyMonitoringTable } from "./table";
import { useParams } from "next/navigation";
import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/sidebar";
import { useIntlayer } from "next-intlayer";

export function KeyMonitoring() {
  const { keyId } = useParams();
  const content = useIntlayer("key-monitoring-content");
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title={content.title.value} />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto p-8 w-screen lg:w-full">
          <KeyMonitoringTable id={keyId as string} />
        </div>
      </div>
    </main>
  );
}
