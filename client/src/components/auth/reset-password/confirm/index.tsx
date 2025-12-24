"use client";

import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { useParams, useRouter } from "next/navigation";
import { useAlertStore } from "@/providers/alert";
import { validate } from "./lib/validate";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { AxiosErrorProps, FormProps } from "@/types";
import { getRequest, getError, postRequest } from "@/utils/axios-instance";
import { Button, Input, Spinner } from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { LocaleSwitcher } from "@/components/navigation/header/locale-switcher";

interface ErrorProps {
  new_password: string;
  confirm_password: string;
}

export const ResetPasswordConfirm = () => {
  const content = useIntlayer("reset-password-content");
  const params = useParams();

  const { setAlert } = useAlertStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorProps>({
    new_password: "",
    confirm_password: "",
  });
  const [values, setValues] = useState<FormProps>({
    new_password: "",
    confirm_password: "",
  });
  const { push } = useRouter();
  const [token, setToken] = useState<null | string>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    [values]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const name = event.target.name as keyof ErrorProps;
      const message = validate(values, name, content);
      setError((prev) => ({ ...prev, [name]: message }));
    },
    [values, error]
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const name = event.target.name;
      if (Boolean(error[name as keyof ErrorProps])) {
        setError((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [error]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);

      let has_error = false;
      const messages = {
        new_password: "",
        confirm_password: "",
      };

      for (const key in values) {
        const name = key as keyof ErrorProps;

        messages[name] = validate(values, name, content);

        if (!has_error && messages[name] !== "") has_error = true;
      }

      setError(messages);

      if (has_error || token === null) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await postRequest({
          url: `${ENDPOINTS.password_reset_confirm}/${token}`,
          data: { ...values },
        });
        if (data) {
          push(ROUTES.sign_in);
        }
      } catch (err) {
        const { data, status } = getError(err as AxiosErrorProps);

        if (status && status >= 500)
          setAlert((prev) => ({
            ...prev,
            isVisible: true,
            description: content.errors.server.value,
            color: "danger",
          }));
        else
          setError((prev) => ({
            ...prev,
            [data?.code as keyof ErrorProps]: data?.message,
          }));
      } finally {
        setIsLoading(() => false);
      }
    },
    [values, error, isLoading, token]
  );

  const getToken = useCallback(async () => {
    try {
      const { data } = await getRequest({
        url: `${ENDPOINTS.password_reset_confirm}/${params.slug}`,
      });

      if (data?.token) {
        setToken(data.token);
      }
    } catch (e) {
      const { data, status } = getError(e as AxiosErrorProps);
      if (status && status >= 500)
        setAlert((prev) => ({
          ...prev,
          isVisible: true,
          description: content.errors.server.value,
          color: "danger",
        }));
      else
        setAlert((prev) => ({
          ...prev,
          isVisible: true,
          description: data.message,
          color: "danger",
        }));
    }
  }, [token]);

  useEffect(() => {
    getToken();
  }, []);
  return (
    <div className="h-svh flex items-center justify-center bg-white sm:bg-gradient-to-b from-black to-primary">
      <div className="absolute right-4 top-4">
        <LocaleSwitcher />
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="container sm:w-[420px] sm:bg-white p-4 sm:p-8 sm:rounded-lg sm:shadow-md"
      >
        <h1 className="text-center text-2xl font-semibold mb-8">
          {content.title}
        </h1>
        <Input
          autoComplete="off"
          value={values.new_password}
          variant="bordered"
          size="sm"
          classNames={{
            base: Boolean(error.new_password) ? "mb-0" : "mb-6",
            inputWrapper: "border-1 border-default-300",
            label: "text-default-500",
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          isDisabled={isLoading}
          onFocus={handleFocus}
          label={content.confirm.form.new_password.label}
          type="password"
          name="new_password"
          isInvalid={Boolean(error.new_password)}
          errorMessage={error.new_password}
        />
        <Input
          autoComplete="off"
          value={values.confirm_password}
          variant="bordered"
          size="sm"
          classNames={{
            base: "relative mb-12",
            inputWrapper: "border-1 border-default-300",
            label: "text-default-500",
            helperWrapper: "absolute top-full",
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          isDisabled={isLoading}
          onFocus={handleFocus}
          label={content.confirm.form.confirm_password.label}
          type="password"
          name="confirm_password"
          isInvalid={Boolean(error.confirm_password)}
          errorMessage={error.confirm_password}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          spinner={<Spinner size="md" variant="dots" color="white" />}
          size="lg"
          fullWidth
          color="primary"
        >
          {!isLoading ? content.confirm.form.buttons.submit : null}
        </Button>
      </form>
    </div>
  );
};
