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
import { Chip } from "@heroui/chip";
import { HistoryToolbar } from "./toolbar";
import { ChipVariantProps } from "@heroui/theme";
import { SortDescriptor } from "@react-types/shared";

import useDate from "@/hooks/date";
import { useAlertStore } from "@/providers/alert";
import { getRequest } from "@/utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";
import { useMillify } from "@/hooks/millify";
import { TransactionHistoryProps } from "@/types";

const statusColorMap: Record<string, ChipVariantProps["color"]> = {
  pending: "warning",
  completed: "success",
  failed: "danger",
};

export function TransactionsHistory() {
  const { longDate } = useDate();
  const { setAlert } = useAlertStore();

  const [history, setHistory] = useState<TransactionHistoryProps>({
    data: [],
    page_size: "4",
    page: 1,
    total: 0,
    order: undefined,
    loading: true,
  });

  const handleOrderChahnge = useCallback(
    async ({ column, direction }: SortDescriptor) => {
      setHistory((prev) => ({
        ...prev,
        order: { column, direction },
      }));

      try {
        const { data } = await getRequest({
          url: `${ENDPOINTS.transaction_list}?page=${history.page}&page_size=${
            history.page_size
          }&ordering=${direction === "ascending" ? column : `-${column}`}`,
        });
        if (data && data.results.length > 0) {
          setHistory((prev) => ({ ...prev, data: data.results }));
        }
      } finally {
        setHistory((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    },
    [history]
  );

  const getHistory = useCallback(
    async (page: number, page_size: string) => {
      try {
        const { data } = await getRequest({
          url: `${ENDPOINTS.transaction_list}?page=${page ?? history.page}&page_size=${
            page_size
          }`,
        });

        if (data && data.results.length > 0) {
          setHistory((prev) => ({
            ...prev,
            data: data.results,
            page,
            page_size,
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
    getHistory(history.page, history.page_size);
  }, []);

  return (
    <div>
      <Table
        isCompact
        removeWrapper
        aria-label="Transaction Table"
        isHeaderSticky
        classNames={{
          base: "max-h-[680px] w-full text-xs sm:text-sm overflow-x-auto",
          table: "w-full overflow-x-auto",
          thead: "[&>tr]:first:rounded-none [&>tr]:first:shadow-none",
          th: "bg-transparent text-default-500 border-b border-divider shadow-none first:rounded-none last:rounded-none",
          td: "text-xs sm:text-sm first:group-data-[first=true]/tr:before:rounded-none last:group-data-[first=true]/tr:before:rounded-none group-data-[middle=true]/tr:before:rounded-none group-data-[middle=true]/tr:before:rounded-none last:group-data-[last=true]/tr:before:rounded-none",
        }}
        sortDescriptor={history.order}
        onSortChange={handleOrderChahnge}
      >
        <TableHeader>
          <TableColumn key={"id"} align="start" allowsSorting>
            ID
          </TableColumn>
          <TableColumn key={"amount"} align="start" allowsSorting>
            AMOUNT
          </TableColumn>
          <TableColumn key={"provider"} align="start" allowsSorting>
            PROVIDER
          </TableColumn>
          <TableColumn key={"status"} align="center">
            STATUS
          </TableColumn>

          <TableColumn key={"created_at"} align="center" allowsSorting>
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
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell className="uppercase">
                  {`${useMillify(Number(item.amount))} ${item.currency}`}
                </TableCell>
                <TableCell className="uppercase">{item.provider}</TableCell>

                <TableCell>
                  <Chip
                    classNames={{
                      content: "w-24 uppercase",
                    }}
                    color={statusColorMap[item.status]}
                    size="sm"
                    variant="flat"
                  >
                    {item.status}
                  </Chip>
                </TableCell>
                <TableCell>{longDate(item.created_at)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {history.total > 0 && !history.loading ? (
        <HistoryToolbar history={history} getHistory={getHistory} />
      ) : null}
    </div>
  );
}
