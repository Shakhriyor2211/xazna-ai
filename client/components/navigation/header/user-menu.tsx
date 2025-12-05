import { ENDPOINTS, ROUTES } from "@/shared/site";
import { useUserStore } from "@/hooks/user";
import { getRequest, postRequest } from "@/utils/axios-instance";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FinanceProps } from "@/types";
import { useAlertStore } from "@/providers/alert";
import { CircularProgressbar } from "react-circular-progressbar";
import Link from "next/link";
import { useMillify } from "@/hooks/millify";

export function UserMenu() {
  const { user, setUser } = useUserStore();
  const { push } = useRouter();
  const path = usePathname();

  const { setAlert } = useAlertStore();
  const [finance, setFinance] = useState<FinanceProps | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const signOut = useCallback(async () => {
    try {
      const _ = await postRequest({ url: ENDPOINTS.sign_out });
      push(`${ROUTES.sign_in}?next=${path}`);
    } catch {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        title: "",
        description: "Failed to sign out.",
      }));
    }
  }, []);

  const getFinance = useCallback(async () => {
    try {
      const { data } = await getRequest({ url: ENDPOINTS.finance_info });

      if (data) {
        setFinance(data);
        setProgress(
          Number(data.sub.credit) > 0
            ? 100 -
                (Number(data.sub.credit_expense) / Number(data.sub.credit)) *
                  100
            : 0
        );
      }
    } catch {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        title: "",
        description: "Failed to load finance.",
      }));
    }
  }, []);

  useEffect(() => {
    if (isDropDownOpen) getFinance();
  }, [isDropDownOpen]);

  return (
    <Dropdown showArrow placement="bottom-end" onOpenChange={setIsDropDownOpen}>
      <DropdownTrigger>
        <Avatar
          color={user?.picture.portrait !== null ? "primary" : "default"}
          isBordered
          src={user?.picture.portrait ?? ""}
          showFallback
          className="transition-transform cursor-pointer"
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" className="min-w-60">
        <DropdownSection showDivider>
          <DropdownItem
            textValue="finance information"
            key="finance"
            isReadOnly
            classNames={{
              base: "bg-default-100 data-[hover=true]:bg-default-100 data-[hover=true]:text-inherit cursor-auto",
            }}
          >
            <div className="flex justify-between items-center space-x-2 mt-2">
              <div className="flex items-center space-x-2">
                <CircularProgressbar
                  className={`w-5 h-5 ${progress > 50 ? "stroke-primary" : progress > 20 ? "stroke-warning" : "stroke-danger"}`}
                  strokeWidth={12}
                  counterClockwise={true}
                  styles={{
                    path: {
                      strokeLinecap: "butt",
                      transformOrigin: "center center",
                    },
                    trail: {
                      stroke: "#d6d6d6",
                      strokeLinecap: "butt",
                      transformOrigin: "center center",
                    },
                  }}
                  value={progress}
                />
                <span className="text-base font-semibold">Free</span>
              </div>
              <Link
                href={ROUTES.sub}
                className="text-xs bg-primary text-white py-1 px-2 rounded-md"
              >
                Upgrade
              </Link>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center space-x-2">
                <span className="text-xs text-default-500">Total</span>
                <span className="text-xs">
                  {useMillify(Number(finance?.sub.credit ?? 0))}
                </span>
              </div>
              <div className="flex justify-between items-center space-x-2">
                <span className="text-xs text-default-500">Usage</span>
                <span className="text-xs">
                  {useMillify(Number(finance?.sub.credit_expense ?? 0))}
                </span>
              </div>
              <div className="flex justify-between items-center space-x-2">
                <span className="text-xs text-default-500">finance</span>
                <span className="text-xs">
                  {useMillify(Number(finance?.balance.cash ?? 0))} UZS
                </span>
              </div>
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem key="sub" as="a" href={ROUTES.sub}>
            Subscription
          </DropdownItem>
          <DropdownItem key="transactions" as="a" href={ROUTES.transactions}>
            Transactions
          </DropdownItem>
          <DropdownItem as="a" href={ROUTES.user_profile} key="profile">
            Profile
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            color="danger"
            variant="flat"
            onClick={signOut}
          >
            Sign out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
