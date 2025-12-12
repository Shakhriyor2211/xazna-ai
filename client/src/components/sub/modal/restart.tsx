import { useUserStore } from "@/hooks/user";
import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps } from "@/types";
import { getError, getRequest, postRequest } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { Fragment, useCallback, useState } from "react";

export function SubRestart() {
  const content = useIntlayer("sub-content");
  const [isOpen, setIsOpen] = useState(false);
  const { setUser } = useUserStore();
  const { setAlert } = useAlertStore();

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const getUser = useCallback(async () => {
    try {
      const res = await getRequest({ url: ENDPOINTS.profile });
      setUser(res.data);
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

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await postRequest({
        url: ENDPOINTS.sub_restart,
      });
      if (data) {
        getUser();
        setAlert((prev) => ({
          ...prev,
          color: "success",
          description: content.success.restart.value,
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
    } finally {
      setIsOpen(false);
    }
  }, []);

  return (
    <Fragment>
      <Button fullWidth color="primary" onPress={handleOpen}>
        {content.card.restart.title}
      </Button>
      <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader> {content.card.restart.modal.title}</ModalHeader>
          <ModalBody>
            <p className="text-sm text-default-500">
              {content.card.restart.modal.description}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              {content.card.restart.modal.buttons.cancel}
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              {content.card.restart.modal.buttons.submit}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
