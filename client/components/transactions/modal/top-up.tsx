import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  useDisclosure,
} from "@heroui/react";
import { FocusEvent, Fragment, MouseEvent, useCallback, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { PaymentProviderProps } from "@/types";
import { useIntlayer } from "next-intlayer";

export function TopUp() {
  const content = useIntlayer("transactions-content");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState("");
  const [provider, setProvider] = useState<null | PaymentProviderProps>(null);

  const handleProvider = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setProvider(event.currentTarget.id as typeof provider);
    },
    [provider]
  );

  const handleBlur = useCallback((event: FocusEvent<Element>) => {
    const target = event.target as HTMLInputElement;

    if (target.value === "")
      setError(content.errors.form.amount.required.value);
  }, []);

  return (
    <Fragment>
      <Button
        variant="bordered"
        className="border-1"
        startContent={<IoWalletOutline className="w-5 h-5" />}
        onPress={onOpen}
      >
        {content.top_up.title}
      </Button>
      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader> {content.top_up.modal.title}</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    onClick={handleProvider}
                    id="xazna"
                    className={`p-4 flex items-center justify-center h-18 rounded-lg border cursor-pointer ${provider === "xazna" ? "border-primary pointer-events-none" : "border-divider"}`}
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
                    className={`p-4 flex items-center justify-center h-18 rounded-lg border cursor-pointer ${provider === "click" ? "border-primary pointer-events-none" : "border-divider"}`}
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
                    className={`p-4 flex items-center justify-center h-18 rounded-lg border cursor-pointer ${provider === "payme" ? "border-primary pointer-events-none" : "border-divider"}`}
                  >
                    <img
                      className="w-full"
                      src="/assets/media/images/payme.svg"
                      alt="payme"
                    />
                  </div>
                </div>
                <form className="my-4">
                  <NumberInput
                    radius="sm"
                    size="lg"
                    hideStepper
                    variant="bordered"
                    isRequired
                    fullWidth
                    classNames={{
                      label: "text-sm",
                      inputWrapper: "border border-default-300 shadow-none",
                    }}
                    minValue={1000}
                    maxValue={1000000000}
                    defaultValue={1000}
                    errorMessage={error}
                    isInvalid={Boolean(error)}
                    onBlur={handleBlur}
                    label={content.top_up.modal.form.amount.label}
                    labelPlacement="outside"
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
                <Button color="primary">
                  {" "}
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
