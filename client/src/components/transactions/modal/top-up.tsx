import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { FocusEvent, Fragment, useCallback, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { PaymentProviderProps } from "@/types";
import { useIntlayer } from "next-intlayer";
import { NumberFormatValues, NumericFormat } from "react-number-format";

const MAX_TOP_UP_LIMIT = 1000000000;
const RETURN_URL = "https/ai.xazna.uz/transactions";

export function TopUp() {
  const content = useIntlayer("transactions-content");
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(1000);
  const [error, setError] = useState("");

  const handleBlur = useCallback((event: FocusEvent<Element>) => {
    const target = event.target as HTMLInputElement;

    if (target.value === "")
      setError(content.errors.form.amount.required.value);
  }, []);

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
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader className="mt-4">
                <img
                  className="h-8 mx-auto"
                  src="/assets/media/images/xazna.svg"
                  alt="xazna"
                />
              </ModalHeader>
              <ModalBody>
                <form className="mt-2 mb-4">
                  <NumericFormat
                    defaultValue={amount}
                    onValueChange={handleAmountChange}
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
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onPress={onClose}>
                  {content.top_up.modal.form.buttons.cancel}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  as="a"
                  href={`https://pay.xazna.uz/billing/universal?merchantId=${12321321}&amount=${amount}&invoce=${123123}&returnURL=${RETURN_URL}`}
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
