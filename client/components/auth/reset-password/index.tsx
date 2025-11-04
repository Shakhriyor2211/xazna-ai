"use client";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { AxiosErrorProps } from "@/types";
import { getDataError, postRequest } from "@/utils/axios-instance";
import { Button, Input } from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import { FormEvent, useCallback, useState } from "react";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";

const CLIENT = process.env.NEXT_PUBLIC_CLIENT_URL;

export const ResetPassword = () => {
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
        setError("This field is required.");
        setIsLoading(false);
        return;
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      ) {
        setIsLoading(false);
        setError("Invalid email format.");
        return;
      }

      try {
        const { data } = await postRequest({
          url: ENDPOINTS.password_reset,
          data: { email, target: `${CLIENT}${ROUTES.password_reset_confirm}` },
        });
        if (data) {
          setIsSuccess(true);
        }
      } catch (e) {
        const { message } = getDataError(e as AxiosErrorProps);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [error, isLoading, isSuccess]
  );

  return (
    <div className="h-svh flex items-center justify-center bg-white sm:bg-gradient-to-b from-black to-primary">
      {isSuccess ? (
        <div className="container sm:w-[420px] sm:bg-white p-4 sm:p-8 sm:rounded-lg sm:shadow-md space-y-8">
          <div className="space-y-2">
            <IoFileTrayFullOutline className="w-24 h-24 text-primary mx-auto" />
            <p className="text-center text-sm text-foreground-500">
              Message was sent to your email address
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
            Back to Sign In
          </Button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="container sm:w-[420px] sm:bg-white p-4 sm:p-8 sm:rounded-lg sm:shadow-md space-y-8"
        >
          <h1 className="text-center text-2xl font-semibold">
            Emailingizni kiriting
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
            label="Email"
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
            {!isLoading ? "Continue" : null}
          </Button>
        </form>
      )}
    </div>
  );
};
