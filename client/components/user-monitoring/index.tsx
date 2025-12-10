"use client";
import { UserMonitoringTable } from "./table";
import { Sidebar } from "../navigation/sidebar";
import { Header } from "../navigation/header";
import { useIntlayer } from "next-intlayer";

export function UserMonitoring() {
  const content = useIntlayer("user-monitoring-content");
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title={content.title.value} />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto p-8 w-screen lg:w-full">
          <UserMonitoringTable />
        </div>
      </div>
    </main>
  );
}
