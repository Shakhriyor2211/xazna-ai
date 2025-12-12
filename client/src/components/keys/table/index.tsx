import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import useDate from "@/hooks/date";
import { KeyTableToolbar } from "./toolbar";
import { KeyTableProps } from "@/types";
import { KeyDropdown } from "./drop-down";
import { KeyManage } from "./manage";
import { Fragment } from "react";
import { useIntlayer } from "next-intlayer";

export function KeyTable({ history, getHistory }: KeyTableProps) {
  const { longDate } = useDate();
  const content = useIntlayer("keys-content");
  return (
    <Fragment>
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
          <TableColumn key={"id"} align="start" allowsSorting>
            #
          </TableColumn>
          <TableColumn
            className="uppercase"
            key={"name"}
            align="start"
            allowsSorting
          >
            {content.table.head.name}
          </TableColumn>
          <TableColumn
            className="uppercase"
            key={"key"}
            align="start"
            allowsSorting
          >
            {content.table.head.key}
          </TableColumn>
          <TableColumn
            className="uppercase"
            key={"created_at"}
            align="start"
            allowsSorting
          >
            {content.table.head.created_at}
          </TableColumn>
          <TableColumn className="uppercase" key={"enabled"} align="start">
            {content.table.head.active}
          </TableColumn>
          <TableColumn className="uppercase" align="end">
            {content.table.head.action}
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
                <TableCell className="max-w-40 truncate py-2">
                  {item.name}
                </TableCell>
                <TableCell className="py-2">{`***${item.last_symbols}`}</TableCell>
                <TableCell className="py-2">
                  {longDate(item.created_at)}
                </TableCell>
                <TableCell className="py-2">
                  <KeyManage item={item} />
                </TableCell>
                <TableCell className="py-2">
                  <KeyDropdown
                    item={item}
                    history={history}
                    getHistory={getHistory}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {history.total > 0 && !history.loading ? (
        <KeyTableToolbar history={history} getHistory={getHistory} />
      ) : null}
    </Fragment>
  );
}
