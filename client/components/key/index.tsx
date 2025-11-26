"use client";
import { Layout } from "@/providers/layout";
import { KeyTable } from "./table";
import { CreateKey } from "./create-key";

export function Key() {
  return (
    <Layout title="Key management">
      <section className="p-8 w-screen lg:w-full space-y-4">
        <div className="flex justify-end">
          <CreateKey />
        </div>
        <KeyTable />
      </section>
    </Layout>
  );
}
