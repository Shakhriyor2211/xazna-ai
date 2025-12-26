import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, FinanceProps } from "@/types";
import { getError, getRequest, patchRequest } from "@/utils/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Switch,
  useDisclosure,
} from "@heroui/react";
import millify from "millify";
import { useIntlayer } from "next-intlayer";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export function SubManage() {
  const content = useIntlayer("sub-content");
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
    },
    [finance]
  );

  const getFinance = useCallback(async () => {
    try {
      const { data } = await getRequest({ url: ENDPOINTS.finance_info });

      if (data) setFinance(data);
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
          description: data.message ?? content.errors.server.value,
          isVisible: true,
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
        {content.manage.modal.title}
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
              <ModalHeader> {content.manage.modal.title}</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span> {content.manage.modal.plan}</span>
                    <span className="font-semibold">{finance?.sub.title}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span> {content.manage.modal.credits}</span>
                    <span className="font-semibold">
                      {millify(Number(finance?.sub.credit_expense ?? 0), {
                        precision: 2,
                      })}
                      &nbsp;/&nbsp;
                      {millify(Number(finance?.sub.credit ?? 0), {
                        precision: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b pb-1 border-default-200">
                    <span> {content.manage.modal.plan}</span>
                    <span className="font-semibold">
                      {millify(Number(finance?.sub.price ?? 0), {
                        precision: 2,
                      })}
                      &nbsp;UZS
                    </span>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span> {content.manage.modal.auto_renew}</span>
                    <Switch
                      size="sm"
                      isSelected={finance?.sub.auto_renew}
                      onChange={handleAutoRenew}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span> {content.manage.modal.cash_charge}</span>
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
