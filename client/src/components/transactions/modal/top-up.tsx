import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Fragment, useCallback, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { useIntlayer } from "next-intlayer";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { ENDPOINTS } from "@/shared/site";
import { getError, postRequest } from "@/utils/axios-instance";
import { useAlertStore } from "@/providers/alert";
import { AxiosErrorProps } from "@/types";
import { useRouter } from "next/navigation";

const MAX_TOP_UP_LIMIT = 1000000000;
const MIN_TOP_UP_LIMIT = 1000;
const MERCHANT_ID = process.env.NEXT_PUBLIC_XAZNA_MERCHANT_ID;
const RETURN_URL = process.env.NEXT_PUBLIC_XAZNA_REDIRECT_URL;
const TARGET_URL = process.env.NEXT_PUBLIC_XAZNA_TARGET_URL;

export function TopUp() {
  const content = useIntlayer("transactions-content");
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(MIN_TOP_UP_LIMIT);
  const router = useRouter();
  const [error, setError] = useState("");
  const { setAlert } = useAlertStore();

  const handleBlur = useCallback(() => {
    if (amount < MIN_TOP_UP_LIMIT)
      setError(
        `${content.errors.form.amount.minimum.value} ${MIN_TOP_UP_LIMIT} UZS`,
      );
  }, [amount]);

  const handleFocus = useCallback(() => {
    setError("");
  }, []);

  const handleAmountChange = useCallback(
    (values: NumberFormatValues) => {
      setAmount(values?.floatValue ?? 0);
    },
    [amount],
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setError("");
    setAmount(1000);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (amount < MIN_TOP_UP_LIMIT) return;
    try {
      const { data } = await postRequest({
        url: ENDPOINTS.top_up,
        data: {
          amount,
        },
      });

      if (data)
        router.push(
          `${TARGET_URL}?merchantId=${MERCHANT_ID}&amount=${amount}&invoice=${data.invoice}&returnURL=${RETURN_URL}`,
        );
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
    } finally {
      handleClose();
    }
  }, [amount, isOpen]);

  return (
    <Fragment>
      <Button
        variant="bordered"
        className="border-1"
        startContent={<IoWalletOutline className="w-5 h-5" />}
        onPress={handleOpen}
      >
        {content.top_up.title}
      </Button>
      <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
        <ModalContent as="form" onSubmit={handleSubmit}>
          {(onClose) => (
            <Fragment>
              <ModalHeader>
                <h2 className="text-2xl text-center">Top up</h2>
              </ModalHeader>
              <ModalBody>
                <div className="mt-2 mb-4">
                  <NumericFormat
                    value={amount}
                    onValueChange={handleAmountChange}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSubmit();
                      }
                    }}
                    allowNegative={false}
                    fullWidth
                    variant="bordered"
                    isRequired
                    radius="sm"
                    size="lg"
                    classNames={{
                      label: "text-sm",
                      inputWrapper: "border border-default-300 shadow-none",
                      helperWrapper: "absolute top-full",
                    }}
                    errorMessage={error}
                    isInvalid={Boolean(error)}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    label={content.top_up.modal.form.amount.label}
                    labelPlacement="outside"
                    isAllowed={(values) => {
                      return (values.floatValue ?? 0) < MAX_TOP_UP_LIMIT;
                    }}
                    thousandSeparator=" "
                    customInput={Input}
                    endContent={
                      <span className="text-default-400 text-sm">UZS</span>
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onPress={onClose}>
                  {content.top_up.modal.form.buttons.cancel}
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  // href={`https://pay.xazna.uz/billing/universal?merchantId=${MERCHANT_ID}&amount=${amount}&invoce=${123123}&returnURL=${RETURN_URL}`}
                >
                  {content.top_up.modal.form.buttons.submit}
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
