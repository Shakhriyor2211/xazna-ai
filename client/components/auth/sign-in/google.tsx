import { ENDPOINTS, ROUTES } from "@/shared/site";
import { useUserStore } from "@/hooks/user";
import { getDataError, postRequest } from "@/utils/axios-instance";
import { GoogleIcon } from "@/utils/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useAlertStore } from "@/providers/alert";
import { AxiosErrorProps } from "@/types";
import { Button, Spinner } from "@heroui/react";

const TARGET_URL = process.env.NEXT_PUBLIC_GOOGLE_TARGET_URL;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

export function GoogleSignIn() {
  const { setAlert } = useAlertStore();
  const { setUser } = useUserStore();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const handleSuccess = useCallback(async ({ code }: { code: string }) => {
    if (!code) {
      return;
    }
    try {
      const { data: user } = await postRequest({
        url: ENDPOINTS.google_oauth,
        data: { code },
      });
      if (user) {
        setUser(user);
        push(next != null && next !== "/" ? next : ROUTES.main);
      }
    } catch (err) {
      const { message } = getDataError(err as AxiosErrorProps);
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        title: "",
        description: message,
      }));
    }
  }, []);

  const handleError = useCallback(() => {
    setAlert((prev) => ({
      ...prev,
      isVisible: true,
      color: "danger",
      title: "",
      description: "Failed authenticate via Google account.",
    }));
  }, []);

  const connectGoogle = useGoogleLogin({
    ux_mode: "redirect",
    redirect_uri: REDIRECT_URI,
    state: JSON.stringify({
      next: `${TARGET_URL}${next ?? ROUTES.main}`,
      fallback: `${TARGET_URL}/404`,
    }),
    onSuccess: handleSuccess,
    onError: handleError,
    flow: "auth-code",
    scope: "openid profile email",
  });

  const signIn = useCallback(() => {
    connectGoogle();
  }, []);
  return (
    <Button
      fullWidth
      variant="bordered"
      spinner={<Spinner size="sm" variant="dots" />}
      onPress={signIn}
      color="primary"
      className="border-1"
      startContent={<GoogleIcon size={20} />}
    >
      Google
    </Button>
  );
}
