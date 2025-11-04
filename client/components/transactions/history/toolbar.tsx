import { TransactionToolbarProps } from "@/types";
import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/react";
import { ChangeEvent, useCallback } from "react";

export const HistoryToolbar = ({
  history,
  getHistory,
}: TransactionToolbarProps) => {
  const handleRowChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      if (value === history.page_size) return;

      getHistory(1, value);
    },
    [history]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      getHistory(page, history.page_size);
    },
    [history]
  );
  return (
    <div className="py-2 px-2 flex justify-between items-center mt-12">
      <Pagination
        size="sm"
        showShadow
        showControls
        isDisabled={Math.ceil(history.total / Number(history.page_size)) === 1}
        page={history.page ?? 1}
        total={Math.ceil(history.total / Number(history.page_size))}
        onChange={handlePageChange}
        color="primary"
      />
      <Select
        size="sm"
        variant="bordered"
        classNames={{
          base: "max-w-40",
          trigger: "border border-default-300 cursor-pointer",
        }}
        label="Rows per page"
        labelPlacement="outside-left"
        selectedKeys={[history.page_size]}
        onChange={handleRowChange}
      >
        <SelectItem key="4">4</SelectItem>
        <SelectItem key="8">8</SelectItem>
        <SelectItem key="12">12</SelectItem>
      </Select>
    </div>
  );
};
