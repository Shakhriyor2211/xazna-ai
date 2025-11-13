import { ENDPOINTS } from "@/shared/site";
import { BalanceProps, PlansProps } from "@/types";
import { getRequest } from "@/utils/axios-instance";
import { Button, Skeleton } from "@heroui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { SubscriptionChange } from "./modal/change";
import { SubscriptionRestart } from "./modal/restart";
import { useMillify } from "@/hooks/millify";
import { useAlertStore } from "@/providers/alert";

interface SubscriptionPlansProps {
  isYearly: boolean;
}

export function SubscriptionPlans({ isYearly }: SubscriptionPlansProps) {
  const [plans, setPlans] = useState<PlansProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<BalanceProps | null>(null);
  const { setAlert } = useAlertStore();

  const getPlans = useCallback(async () => {
    try {
      const { data } = await getRequest({ url: ENDPOINTS.plans });
      if (data) setPlans(data);
    } catch {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        title: "",
        description: "Failed to load plans.",
      }));
    } finally {
      setIsLoading(false);
    }
  }, [plans]);

  const getBalance = useCallback(async () => {
    try {
      const { data } = await getRequest({ url: ENDPOINTS.balance_info });

      if (data) setBalance(data);
    } catch {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        title: "",
        description: "Failed to load balance.",
      }));
    }
  }, []);

  useEffect(() => {
    getPlans();
    getBalance();
  }, []);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
      {isLoading ? (
        <Fragment>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl px-6 pt-6 pb-8 flex flex-col h-90 border border-default-200"
            >
              <Skeleton className="w-1/2 h-7 rounded-lg" />
              <Skeleton className="w-full h-3 rounded-lg mt-4" />
              <Skeleton className="w-full h-3 rounded-lg mt-1.5" />
              <Skeleton className="w-2/3 h-3 rounded-lg mt-4" />
              <div className="flex-1 flex flex-col justify-end space-y-8">
                <Skeleton className="w-3/4 h-7 rounded-lg" />
                <Skeleton className="w-full h-10 rounded-xl" />
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <Fragment>
          {plans.map((plan) =>
            plan.title !== "Free" || !isYearly ? (
              <div
                key={plan.id}
                className={`rounded-xl px-6 pt-6 pb-8 flex flex-col h-90 ${
                  balance?.subscription.title === plan.title &&
                  (balance.subscription.period === "annual") === isYearly
                    ? "bg-primary/20"
                    : "border border-default-200"
                }`}
              >
                <h2 className="font-semibold text-lg sm:text-xl">
                  {plan.title}
                </h2>
                <p className="text-sm text-default-500 mt-4">
                  {plan.description}
                </p>
                {plan.title !== "Enterprise" ? (
                  <div className="mt-2">
                    {isYearly ? (
                      <p className="text-sm font-semibold">
                        {`${useMillify(Number(plan.annual.credit))} credits/year`}
                      </p>
                    ) : (
                      <p className="text-sm font-semibold">
                        {`${useMillify(Number(plan.monthly.credit))} credits/month`}
                      </p>
                    )}
                  </div>
                ) : null}
                <div className="flex-1 flex flex-col justify-end">
                  {plan.title !== "Enterprise" ? (
                    <div className="space-y-8">
                      {isYearly ? (
                        <p className="space-x-2">
                          <span className="text-xl sm:text-2xl">
                            {useMillify(Number(plan.annual.price))} UZS
                          </span>
                          <span className="text-default-500">per year</span>
                        </p>
                      ) : (
                        <p className="space-x-2">
                          <span className="text-xl sm:text-2xl">
                            {useMillify(Number(plan.monthly.price))} UZS
                          </span>
                          <span className="text-default-500">per month</span>
                        </p>
                      )}
                      <div
                        className={
                          balance?.subscription.title === "Free" &&
                          plan.title === "Free"
                            ? "invisible"
                            : "visible"
                        }
                      >
                        {balance?.subscription.title === plan.title &&
                        (balance?.subscription.period === "annual") ===
                          isYearly &&
                        plan.title !== "Free" ? (
                          <SubscriptionRestart />
                        ) : (
                          <SubscriptionChange
                            plan={plan.title}
                            period={isYearly ? "annual" : "monthly"}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <Button fullWidth color="primary">
                      Contact sales
                    </Button>
                  )}
                </div>
              </div>
            ) : null
          )}
        </Fragment>
      )}
    </div>
  );
}
