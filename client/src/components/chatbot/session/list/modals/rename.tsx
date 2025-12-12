import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, ChatSessionProps } from "@/types";
import { getError, putRequest } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
} from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { Dispatch, FormEvent, SetStateAction, useCallback } from "react";

interface SessionRenameProps {
  session: ChatSessionProps;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSessions: Dispatch<SetStateAction<ChatSessionProps[]>>;
}

export function SessionRename({
  session,
  isOpen,
  setIsOpen,
  setSessions,
}: SessionRenameProps) {
  const content = useIntlayer("chatbot-content");
  const { setAlert } = useAlertStore();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget as HTMLFormElement & {
        title: HTMLInputElement;
      };

      const title = form.title.value;

      try {
        if (title.trim() === "" || session.title.trim() === title.trim())
          return;

        const { data } = await putRequest({
          url: `${ENDPOINTS.llm_session_item}/${session.id}`,
          data: {
            title: title.trim(),
          },
        });
        console.log(data);

        if (data)
          setSessions((prev) =>
            prev.map((item) =>
              item.id === session.id ? { ...item, title: data.title } : item
            )
          );
      } catch (e) {
        const { data, status } = getError(e as AxiosErrorProps);
        if (status === 500)
          setAlert((prev) => ({
            ...prev,
            isVisible: true,
            color: "danger",
            description: content.errors.session.server.value,
          }));
        else
          setAlert((prev) => ({
            ...prev,
            isVisible: true,
            color: "danger",
            description: data.message,
          }));
      } finally {
        setIsOpen(false);
      }
    },
    []
  );

  return (
    <Modal size="sm" isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              {content.session.dropdown.edit.modal.title}
            </ModalHeader>
            <ModalBody>
              <Input
                variant="underlined"
                fullWidth
                type="text"
                classNames={{
                  inputWrapper: "border-b border-default-300 shadow-none",
                }}
                label={content.session.dropdown.edit.modal.form.title.label}
                name="title"
                defaultValue={session.title}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" color="danger" onPress={onClose}>
                {content.session.dropdown.edit.modal.form.buttons.cancel}
              </Button>
              <Button color="primary" type="submit">
                {content.session.dropdown.edit.modal.form.buttons.submit}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
