import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { ChatSessionProps } from "@/types";
import { deleteRequest } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  PressEvent,
} from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, Fragment, SetStateAction, useCallback } from "react";

interface EditTitleProps {
  session: ChatSessionProps;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSessions: Dispatch<SetStateAction<ChatSessionProps[]>>;
}

export function SessionDelete({
  session,
  isOpen,
  setIsOpen,
  setSessions,
}: EditTitleProps) {
  const { setAlert } = useAlertStore();
  const { sessionId } = useParams();
  const { replace } = useRouter();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await deleteRequest({
        url: `${ENDPOINTS.llm_session_item}/${session.id}`,
      });

      if (data) {
        setSessions((prev) => prev.filter((item) => item.id !== session.id));
        if (sessionId === session.id) replace(ROUTES.chat);
      }
    } catch {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        description: "Failed to delete session.",
      }));
    } finally {
      setIsOpen(false);
    }
  }, [sessionId]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <Fragment>
            <ModalHeader>Delete session</ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to proceed? This action will permanently
                delete the data.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" color="danger" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Contine
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
}
