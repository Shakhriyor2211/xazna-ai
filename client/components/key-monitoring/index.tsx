"use client";
import { Layout } from "@/providers/layout";
import { KeyMonitoringTable } from "./table";
import { useParams } from "next/navigation";

export function KeyMonitoring() {
  const { keyId } = useParams();

  console.log(keyId);

  return (
    <Layout title="Key monitoring">
      <section className="p-8 w-screen lg:w-full space-y-4">
        <KeyMonitoringTable id={keyId as string} />
      </section>
    </Layout>
  );
}
