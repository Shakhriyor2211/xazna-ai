import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { PiDotsThreeBold, PiPencilSimple, PiTrashSimple } from "react-icons/pi";
import { ChatSessionProps } from "@/types";
import { SessionRename } from "./modals/rename";
import { SessionDelete } from "./modals/delete";

interface SessionDropdownProps {
  session: ChatSessionProps;
  setSessions: Dispatch<SetStateAction<ChatSessionProps[]>>;
}

export function SessionDropdown({
  session,
  setSessions,
}: SessionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
        <DropdownTrigger
          onClick={(event: MouseEvent) => event.stopPropagation()}
        >
          <PiDotsThreeBold
            onClick={(event) => event.preventDefault()}
            className="invisible group-hover:visible w-5 h-5 outline-none"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="menu action">
          <DropdownItem
            onPress={handleIsEditOpen}
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

      <SessionRename
        session={session}
        setSessions={setSessions}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />
      <SessionDelete
        session={session}
        setSessions={setSessions}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </Fragment>
  );
}
