"use client";

import Link from "next/link";
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  Suspense,
  useCallback,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { validate } from "./lib/validate";
import { getValidationError, postRequest } from "@/utils/axios-instance";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { AxiosErrorProps, FormProps } from "@/types";
import { GoogleSignIn } from "../sign-in/google";
import { LogoIcon } from "@/utils/icons";
import { useUserStore } from "@/hooks/user";
import { Button, Input, Spinner } from "@heroui/react";

interface ErrorProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const SignUp = () => {
  const { setUser } = useUserStore();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<FormProps>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<ErrorProps>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

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
      setError((prev) => ({ ...prev, ...validate(values, name) }));
    },
    [values, error]
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const name = event.target.name as keyof ErrorProps;

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
      let err = {};

      for (const key in values) {
        const name = key as keyof ErrorProps;
        const new_err = validate(values, name);

        if (error[name] !== new_err[name]) err = { ...err, ...new_err };
        if (new_err[name] !== "" && new_err[name] !== undefined && !has_error)
          has_error = true;
      }

      if (Object.keys(err).length > 0)
        setError((prev) => ({ ...prev, ...err }));

      if (has_error) return;

      setIsLoading(true);

      try {
        const { data } = await postRequest({
          url: ENDPOINTS.sign_up,
          data: { ...values },
        });
        if (data) {
          if (data.is_active) {
            push(ROUTES.main);
            setUser(data);
          } else {
            push(`${ROUTES.verify_email}/${data.otp_id}`);
          }
        }
      } catch (e) {
        const { message } = getValidationError(e as AxiosErrorProps);
        setError((prev) => ({ ...prev, ...message }));
      } finally {
        setIsLoading(() => false);
      }
    },
    [values, error, isLoading]
  );

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner color="primary" />
        </div>
      }
    >
      <div className="h-svh flex items-center justify-center bg-white dark:bg-none dark:bg-black sm:dark:bg-neutral-900 sm:bg-gradient-to-b from-black to-primary">
        <div className="container sm:w-[450px] sm:bg-white sm:dark:bg-black p-4 sm:p-8 sm:rounded-lg sm:shadow-md">
          <div className="hidden sm:flex justify-end space-x-2 items-center">
            <LogoIcon height={32} />
            <span className="uppercase font-semibold">xazna ai</span>
          </div>
          <h1 className="text-2xl font-semibold mb-6 sm:mb-8 sm:mt-8 text-center">
            Tizimga kirish
          </h1>
          <form noValidate onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                value={values.first_name}
                onChange={handleChange}
                size="sm"
                color="primary"
                variant="bordered"
                classNames={{
                  inputWrapper:
                    "dark:bg-neutral-900 border-1 border-default-300",
                  label: "text-default-500",
                }}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="text"
                label="Ism"
                name="first_name"
                errorMessage={error.first_name}
                isInvalid={Boolean(error.first_name)}
              />
              <Input
                value={values.last_name}
                onChange={handleChange}
                size="sm"
                color="primary"
                variant="bordered"
                classNames={{
                  inputWrapper:
                    "dark:bg-neutral-900 border-1 border-default-300",
                  label: "text-default-500",
                }}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="text"
                label="Familiya"
                name="last_name"
                errorMessage={error.last_name}
                isInvalid={Boolean(error.last_name)}
              />
              <Input
                value={values.email}
                onChange={handleChange}
                size="sm"
                color="primary"
                variant="bordered"
                classNames={{
                  inputWrapper:
                    "dark:bg-neutral-900 border-1 border-default-300",
                  label: "text-default-500",
                }}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className="col-span-2"
                type="text"
                label="Email"
                name="email"
                autoComplete="email"
                errorMessage={error.email}
                isInvalid={Boolean(error.email)}
              />
              <Input
                value={values.password}
                onChange={handleChange}
                size="sm"
                color="primary"
                variant="bordered"
                classNames={{
                  inputWrapper:
                    "dark:bg-neutral-900 border-1 border-default-300",
                  label: "text-default-500",
                }}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="password"
                label="Parol"
                name="password"
                autoComplete="off"
                errorMessage={error.password}
                isInvalid={Boolean(error.password)}
              />
              <Input
                value={values.confirm_password}
                onChange={handleChange}
                size="sm"
                color="primary"
                variant="bordered"
                classNames={{
                  inputWrapper:
                    "dark:bg-neutral-900 border-1 border-default-300",
                  label: "text-default-500",
                }}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="password"
                label="Parolni tasdiqlash"
                name="confirm_password"
                autoComplete="off"
                errorMessage={error.confirm_password}
                isInvalid={Boolean(error.confirm_password)}
              />
            </div>
            <Button
              fullWidth
              className="mt-8"
              color="primary"
              isLoading={isLoading}
              type="submit"
            >
              {isLoading ? null : "Akkaunt yaratish"}
            </Button>
          </form>
          <div className="flex items-center space-x-2 my-6">
            <span className="flex-1 border-t border-default-300" />
            <span className="uppercase text-sm text-default-500">yoki</span>
            <hr className="flex-1 border-t border-default-300" />
          </div>
          <GoogleSignIn />
          <p className="text-center space-x-1 mt-4">
            <span className="text-sm text-default-500">
              Akkauntingiz bormi?
            </span>
            <Link href={ROUTES.sign_in} className="text-sm text-blue-600">
              Tizimga kirish
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
};
