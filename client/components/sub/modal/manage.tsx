import { useMillify } from "@/hooks/millify";
import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { FinanceProps } from "@/types";
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

export function SubManage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [finance, setFinance] = useState<FinanceProps | null>(null);
  const { setAlert } = useAlertStore();

  const handleAutoRenew = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;
      try {
        const { data } = await patchRequest({
          url: ENDPOINTS.sub_manage,
          data: { auto_renew: value },
        });

        if (data) {
          setFinance((prev) =>
            prev
              ? {
                  ...prev,
                  sub: { ...prev.sub, auto_renew: value },
                }
              : prev
          );
        }
      } catch {
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          title: "",
          description: "Failed to update sub.",
          isVisible: true,
        }));
      }
    },
    [finance]
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
          setFinance((prev) =>
            prev
              ? {
                  ...prev,
                  balance: { ...prev.balance, chargeable: value },
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
    [finance]
  );

  const getFinance = useCallback(async () => {
    try {
      const { data } = await getRequest({ url: ENDPOINTS.finance_info });

      if (data) setFinance(data);
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
    getFinance();
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
                    <span className="font-semibold">{finance?.sub.title}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span>Credits</span>
                    <span className="font-semibold">
                      {useMillify(Number(finance?.sub.credit_expense ?? 0))}
                      &nbsp;/&nbsp;
                      {useMillify(Number(finance?.sub.credit ?? 0))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span>Plan cost</span>
                    <span className="font-semibold">
                      {useMillify(Number(finance?.sub.price ?? 0))} UZS
                    </span>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span>Auto-renew plan</span>
                    <Switch
                      size="sm"
                      isSelected={finance?.sub.auto_renew}
                      onChange={handleAutoRenew}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Over-limit cash payment</span>
                    <Switch
                      size="sm"
                      isSelected={finance?.balance.chargeable}
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
