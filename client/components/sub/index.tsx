"use client";

import { Layout } from "@/providers/layout";
import { Switch } from "@heroui/react";
import { useState } from "react";
import { SubManage } from "./modal/manage";
import { SubPlans } from "./plans";

export function Sub() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <Layout title="Subscription">
      <div className="p-8">
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
    </Layout>
  );
}
