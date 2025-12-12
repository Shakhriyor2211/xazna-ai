"use client";
import { LocaleSwitcher } from "@/components/navigation/header/locale-switcher";
import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { AxiosErrorProps } from "@/types";
import { getError, postRequest } from "@/utils/axios-instance";
import { Button, Input } from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import { useIntlayer } from "next-intlayer";
import { FormEvent, useCallback, useState } from "react";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";

const TARGET_URL = process.env.NEXT_PUBLIC_GOOGLE_TARGET_URL;

export const ResetPassword = () => {
  const content = useIntlayer("reset-password-content");
  const { setAlert } = useAlertStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleFocus = useCallback(() => {
    setError(null);
  }, [error]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setIsLoading(true);
      const formData = new FormData(event.target as HTMLFormElement);
      const email = (formData.get("email") as string) ?? "";

      if (email.trim() === "") {
        setError(content.errors.main.form.email.required.value);
        setIsLoading(false);
        return;
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      ) {
        setIsLoading(false);
        setError(content.errors.main.form.email.invalid.value);
        return;
      }

      try {
        const { data } = await postRequest({
          url: ENDPOINTS.password_reset,
          data: {
            email,
            target: `${TARGET_URL}${ROUTES.password_reset_confirm}`,
          },
        });
        if (data) {
          setIsSuccess(true);
        }
      } catch (e) {
        const { data, status } = getError(e as AxiosErrorProps);
        if (status && status >= 500) setError(data.message);
        else
          setAlert((prev) => ({
            ...prev,
            isVisible: true,
            color: "danger",
            description: content.errors.server.value,
          }));
      } finally {
        setIsLoading(false);
      }
    },
    [error, isLoading, isSuccess]
  );

  return (
    <div className="h-screen flex items-center justify-center bg-white sm:bg-gradient-to-b from-black to-primary">
      <div className="absolute right-4 top-4">
        <LocaleSwitcher />
      </div>
      {isSuccess ? (
        <div className="container sm:w-[420px] sm:bg-white p-4 sm:p-8 sm:rounded-lg sm:shadow-md space-y-8">
          <div className="space-y-2">
            <IoFileTrayFullOutline className="w-24 h-24 text-primary mx-auto" />
            <p className="text-center text-sm text-foreground-500">
              {content.main.success.description}
            </p>
          </div>
          <Button
            startContent={<MdArrowBack className="w-4 h-4" />}
            as="a"
            fullWidth
            href={ROUTES.sign_in}
            isLoading={isLoading}
            spinner={<Spinner size="md" variant="dots" color="white" />}
            color="primary"
          >
            {content.main.success.buttons.back}
          </Button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="container sm:w-[420px] sm:bg-white p-4 sm:p-8 sm:rounded-lg sm:shadow-md space-y-8"
        >
          <h1 className="text-center text-2xl font-semibold">
            {content.title}
          </h1>
          <Input
            size="sm"
            classNames={{
              inputWrapper: "border-1 border-default-300",
              label: "text-default-500",
            }}
            color="primary"
            variant="bordered"
            isDisabled={isLoading}
            onFocus={handleFocus}
            label={content.main.form.email.label}
            type="text"
            name="email"
            isInvalid={Boolean(error)}
            errorMessage={error}
          />
          <Button
            type="submit"
            isLoading={isLoading}
            spinner={<Spinner size="md" variant="dots" color="white" />}
            fullWidth
            color="primary"
          >
            {!isLoading ? content.main.form.buttons.submit : null}
          </Button>
        </form>
      )}
    </div>
  );
};
