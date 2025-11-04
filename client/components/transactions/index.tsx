"use client";
import { Layout } from "@/providers/layout";
import { TransactionsHistory } from "./history";
import { TopUp } from "./modal/top-up";

export function Transactions() {
  return (
    <Layout title="Transactions">
      <div className="p-8 space-y-8 w-svw lg:w-full">
        <div className="flex justify-end">
          <TopUp />
        </div>
        <TransactionsHistory />
      </div>
    </Layout>
  );
}
