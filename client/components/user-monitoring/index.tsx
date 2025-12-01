"use client";
import { Layout } from "@/providers/layout";
import { UserMonitoringTable } from "./table";

export function UserMonitoring() {
  return (
    <Layout title="Monitoring">
      <section className="p-8 w-screen lg:w-full space-y-4">
        <UserMonitoringTable />
      </section>
    </Layout>
  );
}
