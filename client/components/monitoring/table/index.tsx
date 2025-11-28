"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Key } from "@react-types/shared";

import useDate from "@/hooks/date";
import { useAlertStore } from "@/providers/alert";
import { getRequest } from "@/utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";
import { useMillify } from "@/hooks/millify";
import { MonitoringTableToolbar } from "./toolbar";
import { ExpenseProps } from "@/types";

export function MonitoringTable() {
  const { longDate } = useDate();
  const { setAlert } = useAlertStore();

  const [history, setHistory] = useState<ExpenseProps>({
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
      direction: "ascending" | "descending"
    ) => {
      try {
        const { data } = await getRequest({
          url: `${ENDPOINTS.monitorting_list}?page=${page}&page_size=${
            page_size
          }&ordering=${direction === "ascending" ? column : `-${column}`}`,
        });

        if (data && data.results.length > 0) {
          setHistory((prev) => ({
            ...prev,
            page,
            page_size,
            order: { column, direction },
            data: data.results,
            total: data.count,
          }));
        }
      } catch {
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          title: "Task load error",
          description: "Failed to load history.",
          isVisible: true,
        }));
      } finally {
        setHistory((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    },
    [history]
  );

  useEffect(() => {
    getHistory(
      history.page,
      history.page_size,
      history.order.column,
      history.order.direction
    );
  }, []);

  return (
    <div>
      <Table
        isCompact
        aria-label="Monitoring Table"
        isHeaderSticky
        classNames={{
          base: "max-h-[512px] w-full text-xs sm:text-sm",
          table: "w-full h-full overflow-auto",
          thead: "[&>tr]:first:rounded-none [&>tr]:first:shadow-none",
          td: "text-xs sm:text-sm first:group-data-[first=true]/tr:before:rounded-none last:group-data-[first=true]/tr:before:rounded-none group-data-[middle=true]/tr:before:rounded-none group-data-[middle=true]/tr:before:rounded-none last:group-data-[last=true]/tr:before:rounded-none",
        }}
        sortDescriptor={history.order}
        onSortChange={(value) =>
          getHistory(
            history.page,
            history.page_size,
            value.column,
            value.direction
          )
        }
      >
        <TableHeader>
          <TableColumn key={"counter"} align="start" allowsSorting>
            #
          </TableColumn>

          <TableColumn key={"operation"} align="start" allowsSorting>
            OPERATION
          </TableColumn>
          <TableColumn key={"credit"} align="start">
            CREDIT
          </TableColumn>
          <TableColumn key={"cash"} align="start">
            CASH
          </TableColumn>

          <TableColumn allowsSorting align="start">
            CREATED AT
          </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={history.loading}
          loadingContent={<Spinner variant="dots" />}
          emptyContent={"No data found"}
        >
          {history.data.map((item, i) => {
            return (
              <TableRow
                className="not-last:border-b border-b-divider"
                key={item.id}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell className="uppercase py-2">
                  {item.operation}
                </TableCell>
                <TableCell className="uppercase py-2">{item.credit}</TableCell>
                <TableCell className="uppercase py-2">
                  {`${useMillify(Number(item.cash))} UZS`}
                </TableCell>
                <TableCell className="py-2">
                  {longDate(item.created_at)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {history.total > 0 && !history.loading ? (
        <MonitoringTableToolbar history={history} getHistory={getHistory} />
      ) : null}
    </div>
  );
}
