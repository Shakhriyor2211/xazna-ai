"use client";

import { Layout } from "@/providers/layout";
import { Switch } from "@heroui/react";
import { useState } from "react";
import { SubscriptionManage } from "./modal/manage";
import { SubscriptionPlans } from "./plans";

export function Subscription() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <Layout title="Subscription">
      <div className="p-8">
        <div className="flex justify-between space-x-8">
          <SubscriptionManage />
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
        <SubscriptionPlans isYearly={isYearly} />
      </div>
    </Layout>
  );
}
