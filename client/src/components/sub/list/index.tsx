import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, FinanceProps, PlansProps } from "@/types";
import { getError, getRequest } from "@/utils/axios-instance";
import { Skeleton, Tab, Tabs } from "@heroui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useAlertStore } from "@/providers/alert";
import { useIntlayer } from "next-intlayer";
import { SubManage } from "./modal/manage";
import { SubListCard } from "./card";

export function SubList() {
  const content = useIntlayer("sub-content");
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");
  const [finance, setFinance] = useState<FinanceProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<PlansProps[]>([]);
  const { setAlert } = useAlertStore();

  const getFinance = useCallback(async () => {
    try {
      const { data } = await getRequest({ url: ENDPOINTS.finance_info });

      if (data) setFinance(data);
    } catch (e) {
      const { data, status } = getError(e as AxiosErrorProps);
      if (status && status >= 500)
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          description: content.errors.server.value,
          isVisible: true,
        }));
      else
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          description: data.message ?? content.errors.server.value,
          isVisible: true,
        }));
    }
  }, []);

  const getPlans = useCallback(async () => {
    try {
      const { data } = await getRequest({ url: ENDPOINTS.plan });
      if (data) setPlans(data);
    } catch (e) {
      const { data, status } = getError(e as AxiosErrorProps);
      if (status && status >= 500)
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          description: content.errors.server.value,
          isVisible: true,
        }));
      else
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          description: data.message ?? content.errors.server.value,
          isVisible: true,
        }));
    } finally {
      setIsLoading(false);
    }
  }, [plans]);

  useEffect(() => {
    getPlans();
    getFinance();
  }, []);
  return (
    <Fragment>
      <div className="flex justify-between space-x-8">
        <SubManage />
        <div className="flex items-center space-x-2">
          <Tabs
            size="sm"
            color="primary"
            radius="full"
            onSelectionChange={(key) => setPeriod(key as "monthly" | "annual")}
          >
            <Tab key="monthly" title={content.range.monthly} />
            <Tab key="annual" title={content.range.annual} />
          </Tabs>
        </div>
      </div>
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
              plan.title !== "Free" || period === "monthly" ? (
                <SubListCard
                  key={plan.id}
                  plan={plan}
                  sub={finance?.sub}
                  period={period}
                />
              ) : null
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
