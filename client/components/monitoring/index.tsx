"use client";
import { Layout } from "@/providers/layout";
import { MonitoringTable } from "./table";

export function Monitoring() {
  return (
    <Layout title="Monitoring">
      <div className="p-8 w-svw lg:w-full">
        <MonitoringTable />
      </div>
    </Layout>
  );
}
