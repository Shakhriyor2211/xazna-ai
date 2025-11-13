import { useMillify } from "@/hooks/millify";
import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { BalanceProps } from "@/types";
import { getRequest, patchRequest } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Switch,
  useDisclosure,
} from "@heroui/react";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export function SubscriptionManage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [balance, setBalance] = useState<BalanceProps | null>(null);
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
          setBalance((prev) =>
            prev
              ? {
                  ...prev,
                  subscription: { ...prev.subscription, auto_renew: value },
                }
              : prev
          );
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
    [balance]
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
          setBalance((prev) =>
            prev
              ? {
                  ...prev,
                  chargeable: value,
                }
              : prev
          );
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
    [balance]
  );

  const getBalance = useCallback(async () => {
    try {
      const { data } = await getRequest({ url: ENDPOINTS.balance_info });

      if (data) setBalance(data);
    } catch {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        title: "",
        description: "Failed to load balance.",
      }));
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

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
                      {balance?.subscription.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span>Credits</span>
                    <span className="font-semibold">
                      {useMillify(
                        Number(balance?.subscription.credit_expense ?? 0)
                      )}
                      &nbsp;/&nbsp;
                      {useMillify(Number(balance?.subscription.credit ?? 0))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span>Plan cost</span>
                    <span className="font-semibold">
                      {useMillify(Number(balance?.subscription.price ?? 0))} UZS
                    </span>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span>Auto-renew plan</span>
                    <Switch
                      size="sm"
                      isSelected={balance?.subscription.auto_renew}
                      onChange={handleAutoRenew}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Over-limit cash payment</span>
                    <Switch
                      size="sm"
                      isSelected={balance?.chargeable}
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
