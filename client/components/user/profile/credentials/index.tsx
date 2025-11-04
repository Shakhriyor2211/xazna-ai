import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  Fragment,
  useCallback,
  useRef,
  useState,
} from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { AxiosErrorProps, FormProps, UserStoreProps } from "@/types";
import useDate from "@/hooks/date";
import { validate } from "./lib/validate";
import { getValidationError, putRequest } from "@/utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

export function ProfileCredentials({ user, setUser }: UserStoreProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [values, setValues] = useState<FormProps>({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const { fullDate } = useDate();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name as keyof typeof values;
      setValues((prev) => ({ ...prev, [name]: event.target.value }));
    },
    [values]
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const name = event.target.name as keyof typeof error;

      setValues((prev) => ({ ...prev, [name]: event.target.value }));
      setError((prev) => ({ ...prev, ...validate(values, name) }));
    },
    [values, error]
  );
  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const name = event.target.name as keyof typeof error;

      if (Boolean(error[name])) {
        setError((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [error]
  );
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      let has_error = false;
      let new_error = {
        old_password: "",
        new_password: "",
        confirm_password: "",
      };

      for (const key in values) {
        const name = key as keyof typeof new_error;

        new_error = { ...new_error, ...validate(values, name) };
        if (new_error[name] !== "" && !has_error) has_error = true;
      }
      setError(new_error);

      if (has_error) {
        return;
      }

      try {
        const { data } = await putRequest({
          url: ENDPOINTS.password_change,
          data: { ...values },
        });

        if (data) setUser(data);

        setIsOpen(false);
      } catch (err) {
        const { message } = getValidationError(err as AxiosErrorProps);
        setError((prev) => ({ ...prev, ...message }));
      }
    },
    [values, open, error]
  );

  return (
    <Fragment>
      <div className="space-y-8">
        <div className="flex items-center justify-between space-x-2">
          <Input
            isDisabled
            labelPlacement="outside-top"
            classNames={{
              inputWrapper: "dark:bg-neutral-900 border-1",
              label: "text-foreground-800",
              base: "max-w-96",
            }}
            variant="bordered"
            type="text"
            label="Email"
            defaultValue={user?.email ?? ""}
          />
          <p className="hidden lg:block text-sm space-x-2">
            <span className="text-foreground-800">Joining date:</span>
            <span className="text-foreground-500">
              {user?.created_at ? fullDate(user?.created_at) : "N/A"}
            </span>
          </p>
        </div>
        {user?.regular_auth ? (
          <div className="flex items-center justify-between space-x-2">
            <Button
              onPress={handleOpen}
              startContent={<RiLockPasswordLine className="w-4 h-4" />}
              size="sm"
            >
              Change password
            </Button>
            <p className="hidden lg:block text-sm space-x-2">
              <span className="text-foreground-800">Last password update:</span>
              <span className="text-foreground-500">
                {user?.last_password_update
                  ? fullDate(user?.last_password_update)
                  : "N/A"}
              </span>
            </p>
          </div>
        ) : null}
      </div>
      <Modal
        className="p-4 bg-white dark:bg-neutral-900"
        isOpen={isOpen}
        onClose={handleClose}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form ref={formRef} noValidate onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Change password
              </ModalHeader>
              <ModalBody>
                <Input
                  onChange={handleChange}
                  autoComplete="off"
                  onFocus={handleFocus}
                  size="sm"
                  classNames={{
                    inputWrapper: "dark:bg-black border-1 border-default-300",
                    label: "text-default-500",
                  }}
                  color="primary"
                  variant="bordered"
                  isInvalid={Boolean(error.old_password)}
                  errorMessage={error.old_password}
                  onBlur={handleBlur}
                  label="Old password"
                  type="password"
                  name="old_password"
                />
                <Input
                  onChange={handleChange}
                  autoComplete="off"
                  onFocus={handleFocus}
                  size="sm"
                  classNames={{
                    inputWrapper: "dark:bg-black border-1 border-default-300",
                    label: "text-default-500",
                  }}
                  color="primary"
                  variant="bordered"
                  isInvalid={Boolean(error.new_password)}
                  errorMessage={error.new_password}
                  onBlur={handleBlur}
                  label="New password"
                  type="password"
                  name="new_password"
                />
                <Input
                  onChange={handleChange}
                  autoComplete="off"
                  size="sm"
                  classNames={{
                    inputWrapper: "dark:bg-black border-1 border-default-300",
                    label: "text-default-500",
                  }}
                  variant="bordered"
                  isInvalid={Boolean(error.confirm_password)}
                  errorMessage={error.confirm_password}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  color="primary"
                  label="Confirm password"
                  type="password"
                  name="confirm_password"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
