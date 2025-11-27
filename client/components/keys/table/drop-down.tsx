import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { deleteRequest, getRequest } from "@/utils/axios-instance";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Fragment, useCallback, useState } from "react";
import {
  PiCopySimple,
  PiDotsThreeBold,
  PiPencilSimple,
  PiTrashSimple,
} from "react-icons/pi";
import { KeyDelete } from "./delete";
import { KeyTableProps } from "@/types";

interface KeyDropdownProps extends KeyTableProps {
  id: number;
}

export function KeyDropdown({ id, history, getHistory }: KeyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { setAlert } = useAlertStore();

  const handleCopy = useCallback(async () => {
    try {
      const { data } = await getRequest({
        url: `${ENDPOINTS.key_item}/${id}`,
      });
      if (data) {
        navigator.clipboard.writeText(data.key);
        setAlert((prev) => ({
          ...prev,
          color: "default",
          title: "",
          description: "Key copied to clipboard.",
          isVisible: true,
        }));
      }
    } catch {
      setAlert((prev) => ({
        ...prev,
        color: "danger",
        title: "",
        description: "Failed to copy key.",
        isVisible: true,
      }));
    }
  }, []);

  const handleIsEditOpen = useCallback(() => {
    setIsEditOpen(true);
  }, []);

  const handleIsDeleteOpen = useCallback(() => {
    setIsDeleteOpen(true);
  }, []);
  return (
    <Fragment>
      <Dropdown
        size="sm"
        placement="bottom-end"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <PiDotsThreeBold
              onClick={(event) => event.preventDefault()}
              className="w-5 h-5 outline-none"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="menu action">
          <DropdownItem
            onPress={handleCopy}
            as="button"
            key="copy"
            variant="flat"
          >
            <div className="flex items-center space-x-2 text-default-700">
              <PiCopySimple className="w-4 h-4" />
              <span>Copy</span>
            </div>
          </DropdownItem>
          <DropdownItem
            // onPress={handleIsEditOpen}
            as="button"
            key="edit"
            variant="flat"
          >
            <div className="flex items-center space-x-2 text-default-700">
              <PiPencilSimple className="w-4 h-4" />
              <span>Edit</span>
            </div>
          </DropdownItem>
          <DropdownItem
            onPress={handleIsDeleteOpen}
            as="button"
            key="delete"
            className="text-danger"
            variant="flat"
            color="danger"
          >
            <div className="flex items-center space-x-2 text-danger-500">
              <PiTrashSimple className="w-4 h-4" />
              <span>Delete</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <KeyDelete
        id={id}
        history={history}
        getHistory={getHistory}
        setIsOpen={setIsDeleteOpen}
        isOpen={isDeleteOpen}
      />
    </Fragment>
  );
}
