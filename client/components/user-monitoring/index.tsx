"use client";
import { Layout } from "@/providers/layout";
import { UserMonitoringTable } from "./table";
import { Sidebar } from "../navigation/sidebar";
import { Header } from "../navigation/header";

export function UserMonitoring() {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Monitoring" />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto p-8 w-screen lg:w-full">
          <UserMonitoringTable />
        </div>
      </div>
    </main>
  );
}
