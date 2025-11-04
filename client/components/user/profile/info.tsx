import { ENDPOINTS } from "@/shared/site";
import { UserStoreProps } from "@/types";
import { patchRequest } from "@/utils/axios-instance";
import { Input } from "@heroui/react";
import { FocusEvent, useCallback } from "react";

export function ProfileInfo({ user, setUser }: UserStoreProps) {
  const handleSubmit = useCallback(
    async (event: FocusEvent<HTMLInputElement, Element>) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      const name = target.name as "first_name" | "last_name";

      if (
        value.trim() === "" ||
        user === null ||
        value.trim() === user[name]?.trim()
      )
        return;

      try {
        const { data } = await patchRequest({
          url: ENDPOINTS.change_account_info,
          data: {
            [target.name]: target.value,
          },
        });
        setUser(data);
      } catch (error) {}
    },
    [user]
  );
  return (
    <form className="grid sm:grid-cols-2 gap-4">
      <Input
        onBlur={handleSubmit}
        color="primary"
        labelPlacement="outside-top"
        classNames={{
          inputWrapper: "dark:bg-neutral-900 border-1",
          label: "text-foreground-800",
        }}
        name="first_name"
        variant="bordered"
        type="text"
        label="First Name"
        defaultValue={user?.first_name ?? ""}
      />
      <Input
        onBlur={handleSubmit}
        color="primary"
        labelPlacement="outside-top"
        classNames={{
          inputWrapper: "dark:bg-neutral-900 border-1",
          label: "text-foreground-800",
        }}
        variant="bordered"
        type="text"
        name="last_name"
        label="Last name"
        defaultValue={user?.last_name ?? ""}
      />
    </form>
  );
}
