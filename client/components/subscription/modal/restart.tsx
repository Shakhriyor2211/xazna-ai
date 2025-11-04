import { useUserStore } from "@/hooks/user";
import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { getRequest, postRequest } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Fragment, useCallback, useState } from "react";

export function SubscriptionRestart() {
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
    } catch {
      setAlert((prev) => ({
        ...prev,
        color: "danger",
        title: "",
        description: "Failed to load user data.",
        isVisible: true,
      }));
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await postRequest({
        url: ENDPOINTS.subsciritpion_restart,
      });
      if (data) {
        getUser();
        setAlert((prev) => ({
          ...prev,
          color: "success",
          title: "",
          description: "Your plan restarted successfully.",
          isVisible: true,
        }));
      }
    } catch {
      setAlert((prev) => ({
        ...prev,
        color: "danger",
        title: "",
        description: "Failed to restart your plan.",
        isVisible: true,
      }));
    } finally {
      setIsOpen(false);
    }
  }, []);

  return (
    <Fragment>
      <Button fullWidth color="primary" onPress={handleOpen}>
        Restart
      </Button>
      <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader>Restart plan</ModalHeader>
          <ModalBody>
            <p>Do you wish to proceed with restarting your plan?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
