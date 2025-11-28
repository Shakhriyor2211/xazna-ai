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

export function KeyTable({ history, getHistory }: KeyTableProps) {
  const { longDate } = useDate();

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
          <TableColumn key={"id"} align="start" allowsSorting>
            #
          </TableColumn>
          <TableColumn key={"name"} align="start" allowsSorting>
            NAME
          </TableColumn>
          <TableColumn key={"key"} align="start" allowsSorting>
            KEY
          </TableColumn>
          <TableColumn key={"created_at"} align="start" allowsSorting>
            CREATED AT
          </TableColumn>
          <TableColumn key={"enabled"} align="start">
            ENABLED
          </TableColumn>
          <TableColumn align="end">ACTIONS</TableColumn>
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
    </div>
  );
}
