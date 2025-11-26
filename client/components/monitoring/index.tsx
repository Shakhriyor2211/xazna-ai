"use client";
import { Layout } from "@/providers/layout";
import { MonitoringTable } from "./table";

export function Monitoring() {
  return (
    <Layout title="Monitoring">
      <section className="p-8 w-screen lg:w-full">
        <MonitoringTable />
      </section>
    </Layout>
  );
}
