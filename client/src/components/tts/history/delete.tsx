import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, ContentHistoryProps } from "@/types";
import { deleteRequest, getError } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { Fragment, useCallback } from "react";
import { PiTrash } from "react-icons/pi";

interface TTSDeleteProps {
  id: string;
  history: ContentHistoryProps;
  getHistory: (page?: number, scrollBottom?: boolean) => void;
}

export function TTSDelete({ id, history, getHistory }: TTSDeleteProps) {
  const content = useIntlayer("tts-content");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setAlert } = useAlertStore();

  const handleDelete = useCallback(async () => {
    try {
      const { data } = await deleteRequest({
        url: `${ENDPOINTS.tts_item}/${id}`,
      });

      if (data) getHistory(history.results.length, false);
    } catch (e) {
      const { data, status } = getError(e as AxiosErrorProps);
      if (status === 500)
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
    <Fragment>
      <Button
        onPress={onOpen}
        color="danger"
        isIconOnly
        size="sm"
        variant="light"
      >
        <PiTrash className="w-5 h-5" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader className="flex flex-col gap-1">
                {content.history.modal.title}
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-default-500">
                  {content.history.modal.description}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  {content.history.modal.buttons.cancel}
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    handleDelete();
                    onClose();
                  }}
                >
                  {content.history.modal.buttons.submit}
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
