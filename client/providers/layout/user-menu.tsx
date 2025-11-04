import { ENDPOINTS, ROUTES } from "@/shared/site";
import { useUserStore } from "@/hooks/user";
import { postRequest } from "@/utils/axios-instance";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { PiGearLight, PiSignOutLight } from "react-icons/pi";

export function UserMenu() {
  const { user, setUser } = useUserStore();
  const { push } = useRouter();
  const path = usePathname();

  const signOut = useCallback(async () => {
    try {
      const _ = await postRequest({ url: ENDPOINTS.sign_out });
      setUser(null);
      push(`${ROUTES.sign_in}?next=${path}`);
    } catch {}
  }, [user]);
  return (
    <Dropdown placement="right-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform mt-2"
          color="primary"
          name={user?.first_name}
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu
        className="min-w-60"
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownSection showDivider>
          <DropdownItem
            key="profile"
            className="h-14 gap-2 pointer-events-none"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold max-w-[200px] truncate">
              {user?.email ?? "-"}
            </p>
          </DropdownItem>
          <DropdownItem
            startContent={
              <CiCreditCard1 className="w-6 h-6 text-foreground-500" />
            }
            key="balance"
          >
            Balance
          </DropdownItem>

          <DropdownItem
            startContent={
              <PiGearLight className="w-6 h-6 text-foreground-500" />
            }
            key="settings"
          >
            Settings
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            startContent={
              <PiSignOutLight className="w-6 h-6 text-foreground-500 group-hover:text-inherit" />
            }
            key="logout"
            color="danger"
            onClick={signOut}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
