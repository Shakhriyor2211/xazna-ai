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
import { ChipVariantProps } from "@heroui/theme";
import { Key } from "@react-types/shared";
import useDate from "@/hooks/date";
import { useAlertStore } from "@/providers/alert";
import { getRequest } from "@/utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";
import { useMillify } from "@/hooks/millify";
import { TransactionProps } from "@/types";
import { TransactionTableToolbar } from "./toolbar";

const statusColorMap: Record<string, ChipVariantProps["color"]> = {
  pending: "warning",
  completed: "success",
  failed: "danger",
};

export function TransactionsTable() {
  const { longDate } = useDate();
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
      direction: "ascending" | "descending"
    ) => {
      try {
        const { data } = await getRequest({
          url: `${ENDPOINTS.transaction_list}?page=${page}&page_size=${
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
        aria-label="Transaction Table"
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
          <TableColumn key={"id"} align="start" allowsSorting>
            #
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
              <TableRow
                className="not-last:border-b border-b-divider"
                key={item.id}
              >
                <TableCell className="py-2">
                  {history.order.direction === "descending"
                    ? i + 1
                    : history.data.length - i}
                </TableCell>
                <TableCell className="uppercase py-2">
                  {`${useMillify(Number(item.amount))} ${item.currency}`}
                </TableCell>
                <TableCell className="uppercase py-2">
                  {item.provider}
                </TableCell>

                <TableCell className="py-2">
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
                <TableCell className="py-2">
                  {longDate(item.created_at)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {history.total > 0 && !history.loading ? (
        <TransactionTableToolbar history={history} getHistory={getHistory} />
      ) : null}
    </div>
  );
}
