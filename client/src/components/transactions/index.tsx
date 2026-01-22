"use client";
import { TransactionsTable } from "./table";
import { TopUp } from "./modal/top-up";
import { Sidebar } from "../navigation/sidebar";
import { Header } from "../navigation/header";
import { useIntlayer } from "next-intlayer";
import { useCallback, useEffect, useState } from "react";
import { Key } from "@react-types/shared";
import { AxiosErrorProps, TransactionProps } from "@/types";
import { getError, getRequest } from "@/utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";
import { useAlertStore } from "@/providers/alert";

export function Transactions() {
  const content = useIntlayer("transactions-content");
  const { setAlert } = useAlertStore();
  const [history, setHistory] = useState<TransactionProps>({
    data: [],
    page_size: "4",
    page: 1,
    total: 0,
    order: {
      column: "created_at",
      direction: "descending",
    },
    loading: true,
  });

  const getHistory = useCallback(
    async (
      page: number,
      page_size: string,
      column: Key,
      direction: "ascending" | "descending",
    ) => {
      try {
        const { data } = await getRequest({
          url: `${
            ENDPOINTS.billing_list
          }?page=${page}&page_size=${page_size}&ordering=${
            direction === "ascending" ? column : `-${column}`
          }`,
        });

        if (data) {
          setHistory((prev) => ({
            ...prev,
            page,
            page_size,
            order: { column, direction },
            data: data.results,
            total: data.count,
          }));
        }
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
        setHistory((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    },
    [history],
  );

  useEffect(() => {
    getHistory(
      history.page,
      history.page_size,
      history.order.column,
      history.order.direction,
    );
  }, []);

  return (
    <main className="flex h-svh">
      <Sidebar />
      <div className="flex-1">
        <Header title={content.title.value} />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto p-8 space-y-8 w-screen lg:w-full">
          <div className="flex justify-end">
            <TopUp />
          </div>
          <TransactionsTable history={history} getHistory={getHistory} />
        </div>
      </div>
    </main>
  );
}
