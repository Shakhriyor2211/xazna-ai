import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, KeyTableProps } from "@/types";
import { deleteRequest, getError } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { Dispatch, Fragment, SetStateAction, useCallback } from "react";

interface DeleteKeyProps extends KeyTableProps {
  id: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeleteKey({
  id,
  isOpen,
  setIsOpen,
  history,
  getHistory,
}: DeleteKeyProps) {
  const { setAlert } = useAlertStore();
  const content = useIntlayer("keys-content");
  const handleDelete = useCallback(async () => {
    try {
      const { data } = await deleteRequest({
        url: `${ENDPOINTS.token_item}/${id}`,
      });

      if (data) {
        setAlert((prev) => ({
          ...prev,
          description: content.info.delete.value,
          isVisible: true,
        }));
        getHistory(
          history.page,
          history.page_size,
          history.order.column,
          history.order.direction
        );
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
  }, [history]);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <ModalContent>
        {(onClose) => (
          <Fragment>
            <ModalHeader className="flex flex-col gap-1">
              {content.table.dropdown.delete.modal.title}
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-default-500">
                {content.table.dropdown.delete.modal.description}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                {content.table.dropdown.delete.modal.buttons.cancel}
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  handleDelete();
                  onClose();
                }}
              >
                {content.table.dropdown.delete.modal.buttons.submit}
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
}
