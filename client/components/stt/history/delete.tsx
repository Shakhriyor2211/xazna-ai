import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { ContentHistoryProps } from "@/types";
import { deleteRequest } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Fragment, useCallback } from "react";
import { PiTrash } from "react-icons/pi";

interface STTDeleteProps {
  id: string;
  history: ContentHistoryProps;
  getHistory: (page?: number) => void;
}

export function STTDelete({ id, history, getHistory }: STTDeleteProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setAlert } = useAlertStore();

  const handleDelete = useCallback(async () => {
    try {
      const { data } = await deleteRequest({
        url: `${ENDPOINTS.stt_item}/${id}`,
      });
      if (data) getHistory(history.range);
      else {
        if (history.range - 1 > 0) {
          getHistory(history.range - 1);
        } else getHistory(1);
      }
    } catch {
      setAlert((prev) => ({
        ...prev,
        color: "danger",
        title: "",
        description: "Failed to delete data.",
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
              <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
              <ModalBody>
                <p className="text-sm text-default-500">
                  Are you sure you'd like to delete the transcription?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
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
    </Fragment>
  );
}
