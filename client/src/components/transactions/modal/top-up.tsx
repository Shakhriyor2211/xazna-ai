import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import {
  FocusEvent,
  FormEvent,
  Fragment,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import { IoWalletOutline } from "react-icons/io5";
import { PaymentProviderProps } from "@/types";
import { useIntlayer } from "next-intlayer";
import { NumberFormatValues, NumericFormat } from "react-number-format";

const PROVIDERS = {
  xazna: {
    url: "",
    merchant_id: "",
    merchant_user_id: "",
    service_id: "",
    transaction_param: "",
    return_url: "",
  },
  click: {
    url: process.env.NEXT_PUBLIC_CLICK_URL,
    merchant_id: process.env.NEXT_PUBLIC_CLICK_MERCHANT_ID,
    merchant_user_id: process.env.NEXT_PUBLIC_CLICK_MERCHANT_USER_ID,
    service_id: process.env.NEXT_PUBLIC_CLICK_SERVICE_ID,
    transaction_param: "1",
    return_url: "https://ai.xazna.uz/ru/transactions",
  },
  payme: {
    url: "",
    merchant_id: "",
    merchant_user_id: "",
    service_id: "",
    transaction_param: "",
    return_url: "",
  },
};

const MAX_TOP_UP_LIMIT = 1000000000;

export function TopUp() {
  const content = useIntlayer("transactions-content");
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(1000);
  const [error, setError] = useState("");
  const [provider, setProvider] = useState<null | PaymentProviderProps>(null);
  const [url, setUrl] = useState("");

  const handleProvider = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      const value = event.currentTarget.id as keyof typeof PROVIDERS;
      const p = PROVIDERS[value];
      setUrl(
        `${p.url}?service_id=${p.service_id}&merchant_id=${p.merchant_id}&transaction_param=${p.transaction_param}&return_url=${p.return_url}`
      );
      setProvider(value);
    },
    [provider]
  );

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
    [amount]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(amount, provider);

      if (!provider || !amount) return;

      const redirectUrl = `${url}&amount=${amount}`;
      window.location.href = redirectUrl;
    },
    [provider, amount, url]
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
              <ModalHeader> {content.top_up.modal.title}</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    onClick={handleProvider}
                    id="xazna"
                    className={`p-4 flex items-center justify-center h-18 rounded-lg border cursor-pointer ${
                      provider === "xazna"
                        ? "bg-primary/30 border-primary pointer-events-none"
                        : "border-divider"
                    }`}
                  >
                    <img
                      className="w-full"
                      src="/assets/media/images/xazna.svg"
                      alt="xazna"
                    />
                  </div>
                  <div
                    onClick={handleProvider}
                    id="click"
                    className={`p-4 flex items-center justify-center h-18 rounded-lg border cursor-pointer ${
                      provider === "click"
                        ? "bg-primary/30 border-primary pointer-events-none"
                        : "border-divider"
                    }`}
                  >
                    <img
                      className="w-full"
                      src="/assets/media/images/click.svg"
                      alt="click"
                    />
                  </div>
                  <div
                    onClick={handleProvider}
                    id="payme"
                    className={`p-4 flex items-center justify-center h-18 rounded-lg border cursor-pointer ${
                      provider === "payme"
                        ? "bg-primary/30 border-primary pointer-events-none"
                        : "border-divider"
                    }`}
                  >
                    <img
                      className="w-full"
                      src="/assets/media/images/payme.svg"
                      alt="payme"
                    />
                  </div>
                </div>
                <form className="mt-2 mb-4" onSubmit={handleSubmit}>
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
                  // as="a"
                  // href={`${url}&amount=${amount}`}
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
