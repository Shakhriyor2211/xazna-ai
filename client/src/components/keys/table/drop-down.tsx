import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { getError, getRequest } from "@/utils/axios-instance";
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
  PiPresentationChart,
  PiTrashSimple,
} from "react-icons/pi";
import { AxiosErrorProps, KeyResultsProps, KeyTableProps } from "@/types";
import { DeleteKey } from "./delete";
import { EditKey } from "../edit-key";
import { useIntlayer } from "next-intlayer";

interface KeyDropdownProps extends KeyTableProps {
  item: KeyResultsProps;
}

export function KeyDropdown({ item, history, getHistory }: KeyDropdownProps) {
  const content = useIntlayer("keys-content");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { setAlert } = useAlertStore();

  const handleCopy = useCallback(async () => {
    try {
      const { data } = await getRequest({
        url: `${ENDPOINTS.token_key}/${item.id}`,
      });
      if (data) {
        navigator.clipboard.writeText(data.key);
        setAlert((prev) => ({
          ...prev,
          color: "default",
          description: content.info.copy.value,
          isVisible: true,
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
          description: data.message,
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
            textValue={"copy"}
            href={`${ROUTES.keys}/${item.id}${ROUTES.key_monitoring}`}
            as="a"
            key="monitoring"
            variant="flat"
          >
            <div className="flex items-center space-x-2 text-default-700">
              <PiPresentationChart className="w-4 h-4" />
              <span>{content.table.dropdown.monitoring.title}</span>
            </div>
          </DropdownItem>
          <DropdownItem
            textValue={"copy"}
            onPress={handleCopy}
            as="button"
            key="copy"
            variant="flat"
          >
            <div className="flex items-center space-x-2 text-default-700">
              <PiCopySimple className="w-4 h-4" />
              <span>{content.table.dropdown.copy.title}</span>
            </div>
          </DropdownItem>
          <DropdownItem
            textValue={"edit"}
            onPress={handleIsEditOpen}
            as="button"
            key="edit"
            variant="flat"
          >
            <div className="flex items-center space-x-2 text-default-700">
              <PiPencilSimple className="w-4 h-4" />
              <span>{content.table.dropdown.edit.title}</span>
            </div>
          </DropdownItem>
          <DropdownItem
            textValue={"delete"}
            onPress={handleIsDeleteOpen}
            as="button"
            key="delete"
            className="text-danger"
            variant="flat"
            color="danger"
          >
            <div className="flex items-center space-x-2 text-danger-500">
              <PiTrashSimple className="w-4 h-4" />
              <span>{content.table.dropdown.delete.title}</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <DeleteKey
        id={item.id}
        history={history}
        getHistory={getHistory}
        setIsOpen={setIsDeleteOpen}
        isOpen={isDeleteOpen}
      />
      <EditKey
        item={item}
        history={history}
        getHistory={getHistory}
        setIsOpen={setIsEditOpen}
        isOpen={isEditOpen}
      />
    </Fragment>
  );
}
