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
import { getError, putRequest } from "@/utils/axios-instance";
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
import { useAlertStore } from "@/providers/alert";
import { useIntlayer } from "next-intlayer";

export function ProfileCredentials({ user, setUser }: UserStoreProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const content = useIntlayer("profile-content");
  const { setAlert } = useAlertStore();
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
    setError({ old_password: "", new_password: "", confirm_password: "" });
  }, [isOpen]);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const name = event.target.name as keyof typeof error;

      setValues((prev) => ({ ...prev, [name]: event.target.value }));
      setError((prev) => ({ ...prev, ...validate(values, name, content) }));
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

        new_error = { ...new_error, ...validate(values, name, content) };
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
          setError((prev) => ({
            ...prev,
            [data?.code as keyof typeof error]: data?.message,
          }));
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
            label={content.security.form.email.label}
            defaultValue={user?.email ?? ""}
          />
          <p className="hidden lg:block text-sm space-x-2">
            <span className="text-foreground-800">
              {content.security.join_date}
            </span>
            <span className="text-foreground-500">
              {user?.created_at ? fullDate(user?.created_at) : "-"}
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
              {content.security.change_password.title}
            </Button>
            <p className="hidden lg:block text-sm space-x-2">
              <span className="text-foreground-800">
                {content.security.last_password_upadte}
              </span>
              <span className="text-foreground-500">
                {user?.last_password_update
                  ? fullDate(user?.last_password_update)
                  : "-"}
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
                {content.security.change_password.modal.title}
              </ModalHeader>
              <ModalBody className="gap-0">
                <Input
                  onChange={handleChange}
                  autoComplete="off"
                  onFocus={handleFocus}
                  size="sm"
                  classNames={{
                    base: Boolean(error.old_password) ? "mb-0" : "mb-6",
                    inputWrapper: "dark:bg-black border-1 border-default-300",
                    label: "text-default-500",
                  }}
                  color="primary"
                  variant="bordered"
                  isInvalid={Boolean(error.old_password)}
                  errorMessage={error.old_password}
                  onBlur={handleBlur}
                  label={
                    content.security.change_password.modal.form.old_password
                  }
                  type="password"
                  name="old_password"
                />
                <Input
                  onChange={handleChange}
                  autoComplete="off"
                  onFocus={handleFocus}
                  size="sm"
                  classNames={{
                    base: Boolean(error.new_password) ? "mb-0" : "mb-6",
                    inputWrapper: "dark:bg-black border-1 border-default-300",
                    label: "text-default-500",
                  }}
                  color="primary"
                  variant="bordered"
                  isInvalid={Boolean(error.new_password)}
                  errorMessage={error.new_password}
                  onBlur={handleBlur}
                  label={
                    content.security.change_password.modal.form.new_password
                  }
                  type="password"
                  name="new_password"
                />
                <Input
                  onChange={handleChange}
                  autoComplete="off"
                  size="sm"
                  classNames={{
                    base: "relative mb-8",
                    inputWrapper: "dark:bg-black border-1 border-default-300",
                    label: "text-default-500",
                    helperWrapper: "absolute top-full",
                  }}
                  variant="bordered"
                  isInvalid={Boolean(error.confirm_password)}
                  errorMessage={error.confirm_password}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  color="primary"
                  label={
                    content.security.change_password.modal.form.confirm_password
                  }
                  type="password"
                  name="confirm_password"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  {content.security.change_password.modal.form.buttons.cancel}
                </Button>
                <Button color="primary" type="submit">
                  {content.security.change_password.modal.form.buttons.submit}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
