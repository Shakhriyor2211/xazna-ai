import { Fragment, useCallback, useEffect, useState } from "react";
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
import { TransactionTableToolbar } from "./toolbar";
import useDate from "@/hooks/date";
import { useAlertStore } from "@/providers/alert";
import { AxiosErrorProps, TransactionProps } from "@/types";
import { getError, getRequest } from "@/utils/axios-instance";
import { useIntlayer } from "next-intlayer";
import { ENDPOINTS } from "@/shared/site";
import { PiCheck, PiSpinnerGap, PiX } from "react-icons/pi";
import millify from "millify";

const statusMap = {
  pending: {
    color: "warning",
    icon: <PiSpinnerGap className="w-5 h-5 text-warning-500" />,
  },
  completed: {
    color: "success",
    icon: <PiCheck className="w-5 h-5 text-success-500" />,
  },
  failed: {
    color: "danger",
    icon: <PiX className="w-5 h-5 text-danger-500" />,
  },
};

export function TransactionsTable() {
  const { longDate } = useDate();
  const { setAlert } = useAlertStore();
  const content = useIntlayer("transactions-content");

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
          url: `${
            ENDPOINTS.transaction_list
          }?page=${page}&page_size=${page_size}&ordering=${
            direction === "ascending" ? column : `-${column}`
          }`,
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
    <Fragment>
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
          <TableColumn
            className="uppercase"
            key={"amount"}
            align="start"
            allowsSorting
          >
            {content.table.head.amount}
          </TableColumn>
          <TableColumn
            className="uppercase"
            key={"provider"}
            align="start"
            allowsSorting
          >
            {content.table.head.provider}
          </TableColumn>
          <TableColumn
            className="uppercase text-center"
            key={"status"}
            align="center"
          >
            {content.table.head.status}
          </TableColumn>
          <TableColumn
            className="uppercase"
            key={"created_at"}
            align="center"
            allowsSorting
          >
            {content.table.head.created_at}
          </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={history.loading}
          loadingContent={<Spinner variant="dots" />}
          emptyContent={content.table.empty}
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
                  {`${millify(Number(item.amount), { precision: 2 })} ${
                    item.currency
                  }`}
                </TableCell>
                <TableCell className="uppercase py-2">
                  {item.provider}
                </TableCell>

                <TableCell className="py-2 flex justify-center">
                  {statusMap[item.status as keyof typeof statusMap].icon}
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
    </Fragment>
  );
}
