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
        removeWrapper
        aria-label="Monitoring Table"
        isHeaderSticky
        classNames={{
          base: "max-h-[680px] w-full text-xs sm:text-sm overflow-x-auto",
          table: "w-full overflow-x-auto",
          thead: "[&>tr]:first:rounded-none [&>tr]:first:shadow-none",
          th: "bg-transparent text-default-500 border-b border-divider shadow-none first:rounded-none last:rounded-none",
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
              <TableRow key={item.id}>
                <TableCell>
                  {history.order.direction === "descending"
                    ? i + 1
                    : history.data.length - i}
                </TableCell>
                <TableCell className="max-w-40 truncate">{item.name}</TableCell>
                <TableCell>{`***${item.last_symbols}`}</TableCell>
                <TableCell>{longDate(item.created_at)}</TableCell>
                <TableCell>
                  <KeyManage item={item} />
                </TableCell>
                <TableCell>
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
