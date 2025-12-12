"use client";
import { TransactionsTable } from "./table";
import { TopUp } from "./modal/top-up";
import { Sidebar } from "../navigation/sidebar";
import { Header } from "../navigation/header";
import { useIntlayer } from "next-intlayer";

export function Transactions() {
  const content = useIntlayer("transactions-content");
  return (
    <main className="flex h-svh">
      <Sidebar />
      <div className="flex-1">
        <Header title={content.title.value} />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto p-8 space-y-8 w-screen lg:w-full">
          <div className="flex justify-end">
            <TopUp />
          </div>
          <TransactionsTable />
        </div>
      </div>
    </main>
  );
}
