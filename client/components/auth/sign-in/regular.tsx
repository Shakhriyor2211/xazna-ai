import { useUserStore } from "@/hooks/user";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { AxiosErrorProps } from "@/types";
import { getDataError, postRequest } from "@/utils/axios-instance";
import { Button, Input } from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FocusEvent, FormEvent, useCallback, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function RegularSignIn() {
  const content = useIntlayer("signin-content");
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const { push } = useRouter();
  const { setUser } = useUserStore();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const handleHidden = useCallback(() => {
    setIsHidden((prev) => !prev);
  }, [isHidden]);

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { name } = event.currentTarget;
      setError((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    },
    [error]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError({ email: "", password: "", general: "" });

      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;

      let is_valid = true;

      if (email === "") {
        setError((prev) => ({
          ...prev,
          email: content.regular.form.email.errors.required.value,
        }));
        is_valid = false;
      }
      if (password === "") {
        setError((prev) => ({
          ...prev,
          password: content.regular.form.password.errors.required.value,
        }));
        is_valid = false;
      }

      if (!is_valid) return;

      setIsLoading(true);

      try {
        const { data } = await postRequest({
          url: ENDPOINTS.sign_in,
          data: { email, password },
        });
        if (data) {
          setUser(data);
          push(next != null && next !== "/" ? next : ROUTES.main);
        }
      } catch (err) {
        const { message } = getDataError(err as AxiosErrorProps);
        setError((prev) => ({
          ...prev,
          general: message,
        }));
        setIsLoading(false);
      }
    },
    [error, isLoading]
  );

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Input
        onFocus={handleFocus}
        isInvalid={Boolean(error.email) || Boolean(error.general)}
        errorMessage={error.email}
        size="sm"
        classNames={{
          base: "relative",
          inputWrapper: "dark:bg-neutral-900 border-1 border-default-300",
          label: "text-default-500",
          helperWrapper: "absolute top-full left-0 -mt-0.5",
        }}
        color="primary"
        variant="bordered"
        label={content.regular.form.email.label}
        type="text"
        name="email"
      />
      <Input
        onFocus={handleFocus}
        isInvalid={Boolean(error.password) || Boolean(error.general)}
        errorMessage={Boolean(error.password) ? error.password : error.general}
        size="sm"
        classNames={{
          base: "relative mt-6",
          inputWrapper: "dark:bg-neutral-900 border-1 border-default-300",
          label: "text-default-500",
          helperWrapper: "absolute top-full left-0 -mt-0.5",
        }}
        color="primary"
        variant="bordered"
        isDisabled={isLoading}
        label={content.regular.form.password.label}
        name="password"
        type={isHidden ? "password" : "text"}
        endContent={
          <div className="h-full flex items-center">
            <Button
              size="sm"
              radius="full"
              isIconOnly
              variant="light"
              onPress={handleHidden}
            >
              {isHidden ? (
                <FaEyeSlash className="text-default-500 w-5 h-5" />
              ) : (
                <FaEye className="text-default-500 w-5 h-5" />
              )}
            </Button>
          </div>
        }
      />
      <div className="mt-4 flex justify-end">
        <Link href={ROUTES.password_reset} className="text-sm text-blue-600">
          {content.regular.forgot_password}
        </Link>
      </div>
      <Button
        fullWidth
        className="mt-8"
        color="primary"
        isLoading={isLoading}
        type="submit"
      >
        {isLoading ? null : content.regular.form.submit}
      </Button>
    </form>
  );
}
