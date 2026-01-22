import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import { TransactionTableToolbar } from "./toolbar";
import useDate from "@/hooks/date";
import { useAlertStore } from "@/providers/alert";
import {
  AxiosErrorProps,
  TransactionProps,
  TransactionTableProps,
} from "@/types";
import { getError, getRequest } from "@/utils/axios-instance";
import { useIntlayer } from "next-intlayer";
import { ENDPOINTS } from "@/shared/site";
import { PiCheck, PiSpinnerGap, PiX } from "react-icons/pi";
import millify from "millify";
import { Chip } from "@heroui/react";

const statusMap = {
  pending: "warning",
  completed: "success",
  failed: "danger",
} as const;

export function TransactionsTable({
  history,
  getHistory,
}: TransactionTableProps) {
  const { longDate } = useDate();

  const content = useIntlayer("transactions-content");

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
            value.direction,
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
            key={"invoice"}
            align="start"
            allowsSorting
          >
            {content.table.head.invoice}
          </TableColumn>
          <TableColumn className="uppercase" key={"status"} align="start">
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
                <TableCell className="uppercase py-2">{item.invoice}</TableCell>

                <TableCell className="py-2">
                  {/* {statusMap[item.status as keyof typeof statusMap].icon} */}
                  <Chip
                    size="sm"
                    className="uppercase border-none gap-1 text-default-600"
                    color={statusMap[item.status as keyof typeof statusMap]}
                    variant="dot"
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
    </Fragment>
  );
}
