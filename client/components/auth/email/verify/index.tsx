"use client";
import { useForm, Controller } from "react-hook-form";
import { notFound, useParams, useRouter } from "next/navigation";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useAlertStore } from "@/providers/alert";
import { useUserStore } from "@/hooks/user";
import { postRequest } from "@/utils/axios-instance";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { FetchErrorProps } from "@/types";
import { Button, InputOtp } from "@heroui/react";

const timerFormat = (seconds: number) => {
  return `0${Math.floor(seconds / 60)}:${
    seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`
  }`;
};

export const VerifyEmail = () => {
  const { slug } = useParams();
  const [secondsLeft, setSecondsLeft] = useState(120);

  const { setAlert } = useAlertStore();
  const { setUser } = useUserStore();
  const { push } = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = useCallback(async ({ otp }: { otp: string }) => {
    try {
      const { data } = await postRequest({
        url: ENDPOINTS.verify_email_code,
        data: { otp_id: slug, code: otp },
      });
      if (data) {
        setUser(data);
        push(ROUTES.main);
      }
    } catch (e) {
      const err = e as FetchErrorProps;
      if (err.response?.status == 400) {
        setError("otp", {
          type: "manual",
          message:
            err?.response?.data?.message ?? "An unexpected error occurred.",
        });
      } else {
        setError("otp", {
          type: "manual",
          message: "",
        });
        setAlert((prev) => ({
          ...prev,
          isVisible: true,
          title: "Verification error",
          description:
            err?.response?.data?.message ?? "An unexpected error occurred.",
          color: "danger",
        }));
      }
    }
  }, []);

  const resend = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      setSecondsLeft(120);
      const _ = await postRequest({
        url: ENDPOINTS.resend_email_code,
        data: { otp_id: slug },
      });
    } catch (e) {
      const err = e as FetchErrorProps;

      setError("otp", {
        type: "manual",
        message: "",
      });
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        title: "Verification error",
        description:
          err?.response?.data?.message ?? "An unexpected error occurred.",
        color: "danger",
      }));
    }
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  if (!slug) return notFound();

  return (
    <div className="bg-white sm:bg-gradient-to-b from-black to-primary h-svh flex items-center justify-center font-light">
      <form
        className="container flex flex-col sm:bg-white p-4 sm:p-8 sm:rounded-lg sm:shadow-md max-w-[360px] text-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold">Tasdiqlovchi kodni kiriting</h2>
        <div className="flex flex-col items-center space-y-2 mt-4 mb-8">
          <div>
            <Controller
              control={control}
              name="otp"
              render={({ field }) => (
                <InputOtp
                  {...field}
                  classNames={{
                    errorMessage: "hidden mt-0",
                    helperWrapper: "mt-0",
                  }}
                  isInvalid={!!errors.otp}
                  length={6}
                />
              )}
              rules={{
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "Please enter a valid OTP",
                },
              }}
            />
            <span className="text-foreground-400 text-xs font-extralight">
              Enter the 6 digit code sent to your email
            </span>
          </div>
          <div className="space-x-2 text-sm text-foreground-500">
            <button
              type="button"
              onClick={resend}
              className={`${
                secondsLeft > 0
                  ? "pointer-events-none text-foreground-400"
                  : "text-primary "
              }`}
            >
              Resend code
            </button>
            <span className="text-xs inline-block w-16">
              {timerFormat(secondsLeft)}
            </span>
          </div>
        </div>

        <Button radius="sm" color="primary" type="submit">
          Verify
        </Button>
      </form>
    </div>
  );
};
