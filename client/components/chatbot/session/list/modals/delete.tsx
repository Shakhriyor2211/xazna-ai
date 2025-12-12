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
} from "@heroui/react";
import { useIntlayer } from "next-intlayer";
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
  const content = useIntlayer("chatbot-content");
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
        if (sessionId === session.id) replace(ROUTES.chatbot);
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
            <ModalHeader>
              {content.session.dropdown.delete.modal.title}
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-default-500">
                {content.session.dropdown.delete.modal.description}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                {content.session.dropdown.delete.modal.buttons.cancel}
              </Button>
              <Button color="danger" variant="flat" onPress={handleSubmit}>
                {content.session.dropdown.delete.modal.buttons.submit}
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
}
