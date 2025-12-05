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
import {
  getDataError,
  getRequest,
  getValidationError,
  postRequest,
} from "@/utils/axios-instance";
import { Button, Input, Spinner } from "@heroui/react";

interface ErrorProps {
  new_password: string;
  confirm_password: string;
}

export const ResetPasswordConfirm = () => {
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
      const message = validate(values, name);
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
      console.log("submit");
      const messages = {
        new_password: "",
        confirm_password: "",
      };

      for (const key in values) {
        const name = key as keyof ErrorProps;

        messages[name] = validate(values, name);

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
        const { data } = getValidationError(err as AxiosErrorProps);
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
      const { message: description } = getDataError(e as AxiosErrorProps);
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        title: "",
        description,
        color: "danger",
      }));
    }
  }, [token]);

  useEffect(() => {
    getToken();
  }, []);
  return (
    <div className="h-svh flex items-center justify-center bg-white sm:bg-gradient-to-b from-black to-primary">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="container sm:w-[420px] sm:bg-white p-4 sm:p-8 sm:rounded-lg sm:shadow-md space-y-8"
      >
        <h1 className="text-center text-2xl font-semibold">Parolni tiklash</h1>
        <div className="space-y-4">
          <Input
            autoComplete="off"
            value={values.new_password}
            variant="bordered"
            size="sm"
            classNames={{
              inputWrapper: "border-1 border-default-300",
              label: "text-default-500",
            }}
            onBlur={handleBlur}
            onChange={handleChange}
            isDisabled={isLoading}
            onFocus={handleFocus}
            label="Yangi parol"
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
              inputWrapper: "border-1 border-default-300",
              label: "text-default-500",
            }}
            onBlur={handleBlur}
            onChange={handleChange}
            isDisabled={isLoading}
            onFocus={handleFocus}
            label="Parolni tasdiqlash"
            type="password"
            name="confirm_password"
            isInvalid={Boolean(error.confirm_password)}
            errorMessage={error.confirm_password}
          />
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          spinner={<Spinner size="md" variant="dots" color="white" />}
          size="lg"
          fullWidth
          color="primary"
        >
          {!isLoading ? "Submit" : null}
        </Button>
      </form>
    </div>
  );
};
