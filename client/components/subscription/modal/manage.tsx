import { useMillify } from "@/hooks/millify";
import { useUserStore } from "@/hooks/user";
import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { UserProps } from "@/types";
import { patchRequest } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Switch,
  useDisclosure,
} from "@heroui/react";
import { ChangeEvent, Fragment, useCallback } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export function SubscriptionManage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user, setUser } = useUserStore();
  const { setAlert } = useAlertStore();

  const handleAutoRenew = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;
      try {
        const { data } = await patchRequest({
          url: ENDPOINTS.subsciritpion_manage,
          data: { auto_renew: value },
        });

        if (data) {
          setUser((prev: UserProps) => ({
            ...prev,
            balance: {
              ...prev.balance,
              subscription: { ...prev.balance.subscription, auto_renew: value },
            },
          }));
        }
      } catch {
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          title: "",
          description: "Failed to update subscription.",
          isVisible: true,
        }));
      }
    },
    [user]
  );
  const handleChargeable = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;
      try {
        const { data } = await patchRequest({
          url: ENDPOINTS.balance_manage,
          data: { chargeable: value },
        });

        if (data) {
          setUser((prev: UserProps) => ({
            ...prev,
            balance: {
              ...prev.balance,
              chargeable: value,
            },
          }));
        }
      } catch {
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          title: "",
          description: "Failed to update balance.",
          isVisible: true,
        }));
      }
    },
    [user]
  );

  return (
    <Fragment>
      <Button
        variant="bordered"
        size="sm"
        className="border-1"
        startContent={
          <IoSettingsOutline className="w-4 h-4 text-default-600" />
        }
        onPress={onOpen}
      >
        Manage
      </Button>
      <Modal
        className="pt-2 pb-8"
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader>Manage</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span>Current plan</span>
                    <span className="font-semibold">
                      {user?.balance.subscription.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span>Credits</span>
                    <span className="font-semibold">
                      {useMillify(user?.balance.subscription.credit_expense)}
                      &nbsp;/&nbsp;
                      {useMillify(user?.balance.subscription.credit)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span>Plan cost</span>
                    <span className="font-semibold">
                      {useMillify(user?.balance.subscription.price)} UZS
                    </span>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span>Auto-renew plan</span>
                    <Switch
                      size="sm"
                      isSelected={user?.balance.subscription.auto_renew}
                      onChange={handleAutoRenew}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Over-limit cash payment</span>
                    <Switch
                      size="sm"
                      isSelected={user?.balance.chargeable}
                      onChange={handleChargeable}
                    />
                  </div>
                </div>
              </ModalBody>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
