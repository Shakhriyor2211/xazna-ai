"use client";

import { Header } from "../navigation/header";
import { Sidebar } from "../navigation/sidebar";
import { useIntlayer } from "next-intlayer";
import { SubList } from "./list";
import { SubInfo } from "./info";

export function Sub() {
  const content = useIntlayer("sub-content");

  return (
    <main className="flex h-svh">
      <Sidebar />
      <div className="flex-1">
        <Header title={content.title.value} />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto p-8">
          <SubList />
          <SubInfo />
        </div>
      </div>
    </main>
  );
}
