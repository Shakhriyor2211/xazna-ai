"use client";

import { Layout } from "@/providers/layout";
import { Switch } from "@heroui/react";
import { useState } from "react";
import { SubManage } from "./modal/manage";
import { SubPlans } from "./plans";
import { Header } from "../navigation/header";
import { Sidebar } from "../navigation/sidebar";

export function Sub() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Subscription" />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto p-8">
          <div className="flex justify-between space-x-8">
            <SubManage />
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm ${isYearly ? "text-primary" : "text-default-500"}`}
              >
                Yearly
              </span>
              <Switch
                size="sm"
                isSelected={isYearly}
                onValueChange={setIsYearly}
              />
            </div>
          </div>
          <SubPlans isYearly={isYearly} />
        </div>
      </div>
    </main>
  );
}
