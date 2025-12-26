import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, UserStoreProps } from "@/types";
import { getError, patchRequest } from "@/utils/axios-instance";
import { Input } from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { FocusEvent, useCallback, useState } from "react";

export function ProfileInfo({ user, setUser }: UserStoreProps) {
  const content = useIntlayer("profile-content");
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
  });
  const { setAlert } = useAlertStore();
  const handleSubmit = useCallback(
    async (event: FocusEvent<HTMLInputElement, Element>) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      const name = target.name as "first_name" | "last_name";

      if (value.trim() === "") {
        setError((prev) => ({
          ...prev,
          [name]: content.errors.information.form[name].required.value,
        }));
        return;
      }
      if (user === null || value.trim() === user[name]?.trim()) return;

      try {
        const { data } = await patchRequest({
          url: ENDPOINTS.change_account_info,
          data: {
            [target.name]: target.value,
          },
        });
        setUser(data);
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
          setAlert((prev) => ({
            ...prev,
            color: "danger",
            description: data.message ?? content.errors.server.value,
            isVisible: true,
          }));
      }
    },
    [user]
  );

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const name = target.name as "first_name" | "last_name";
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  }, []);

  return (
    <form className="grid sm:grid-cols-2 gap-4">
      <Input
        isInvalid={Boolean(error.first_name)}
        errorMessage={error.first_name}
        onBlur={handleSubmit}
        onFocus={handleFocus}
        color="primary"
        labelPlacement="outside-top"
        classNames={{
          base: "relative",
          inputWrapper: "dark:bg-neutral-900 border-1",
          label: "text-foreground-800",
          helperWrapper: "absolute top-full",
        }}
        name="first_name"
        variant="bordered"
        type="text"
        label={content.infromation.form.first_name.label}
        defaultValue={user?.first_name ?? ""}
      />
      <Input
        isInvalid={Boolean(error.last_name)}
        errorMessage={error.last_name}
        onBlur={handleSubmit}
        onFocus={handleFocus}
        color="primary"
        labelPlacement="outside-top"
        classNames={{
          base: "relative",
          inputWrapper: "dark:bg-neutral-900 border-1",
          label: "text-foreground-800",
          helperWrapper: "absolute top-full",
        }}
        variant="bordered"
        type="text"
        name="last_name"
        label={content.infromation.form.last_name.label}
        defaultValue={user?.last_name ?? ""}
      />
    </form>
  );
}
