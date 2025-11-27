import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { KeyTableProps } from "@/types";
import { deleteRequest } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Dispatch, Fragment, SetStateAction, useCallback } from "react";

interface KeyDeleteProps extends KeyTableProps {
  id: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function KeyDelete({
  id,
  isOpen,
  setIsOpen,
  history,
  getHistory,
}: KeyDeleteProps) {
  const { setAlert } = useAlertStore();

  const handleDelete = useCallback(async () => {
    try {
      const { data } = await deleteRequest({
        url: `${ENDPOINTS.key_item}/${id}`,
      });

      if (data) {
        setAlert((prev) => ({
          ...prev,
          title: "",
          description: "Key successfully deleted.",
          isVisible: true,
        }));
        getHistory(
          history.page,
          history.page_size,
          history.order.column,
          history.order.direction
        );
      }
    } catch {
      setAlert((prev) => ({
        ...prev,
        color: "danger",
        title: "",
        description: "Failed to delete key.",
        isVisible: true,
      }));
    }
  }, [history]);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <ModalContent>
        {(onClose) => (
          <Fragment>
            <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
            <ModalBody>
              <p className="text-sm text-default-500">
                Are you sure you'd like to delete the key?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  handleDelete();
                  onClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
}
