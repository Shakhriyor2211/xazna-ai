"use client";
import { useUserStore } from "@/hooks/user";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { getRequest, postRequest } from "@/utils/axios-instance";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { ThemeSwitch } from "./theme-switch";
import { Skeleton } from "@heroui/skeleton";
import { Navbar, NavbarMenu, NavbarMenuToggle } from "@heroui/react";
import { Divider } from "@heroui/divider";
import { CircularProgressbar } from "react-circular-progressbar";
import { useMillify } from "@/hooks/millify";
import { ChatSessions } from "./chat-session";
import { useAlertStore } from "../alert";
import { FinanceProps } from "@/types";

export function Header({ title }: { title: string }) {
  const pathname = usePathname();
  const { user } = useUserStore();
  const { setAlert } = useAlertStore();
  const [finance, setFinance] = useState<FinanceProps | null>(null);
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const path = usePathname();
  const { push } = useRouter();

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
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className=""
      classNames={{
        wrapper: "px-4 flex space-x-2 border-b border-default-200",
      }}
    >
      <NavbarMenuToggle className="lg:hidden" />
      <h1 className="font-semibold text-xl text-center lg:text-left flex-1">
        {title}
      </h1>
      <div className="flex items-center">
        <div className="flex-1 flex items-center justify-end space-x-4">
          {user !== null ? (
            <Fragment>
              <ThemeSwitch />

              <Dropdown placement="bottom-end" onOpenChange={setIsDropDownOpen}>
                <DropdownTrigger>
                  <Avatar
                    color={
                      user?.picture.portrait !== null ? "primary" : "default"
                    }
                    isBordered
                    src={user?.picture.portrait ?? ""}
                    showFallback
                    className="transition-transform cursor-pointer"
                    size="sm"
                  />
                </DropdownTrigger>
                <DropdownMenu className="min-w-60">
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
                          <span className="text-xs text-default-500">
                            Total
                          </span>
                          <span className="text-xs">
                            {useMillify(Number(finance?.sub.credit ?? 0))}
                          </span>
                        </div>
                        <div className="flex justify-between items-center space-x-2">
                          <span className="text-xs text-default-500">
                            Usage
                          </span>
                          <span className="text-xs">
                            {useMillify(
                              Number(finance?.sub.credit_expense ?? 0)
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center space-x-2">
                          <span className="text-xs text-default-500">
                            finance
                          </span>
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
                    <DropdownItem
                      key="transactions"
                      as="a"
                      href={ROUTES.transactions}
                    >
                      Transactions
                    </DropdownItem>
                    <DropdownItem
                      as="a"
                      href={ROUTES.user_profile}
                      key="profile"
                    >
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
            </Fragment>
          ) : (
            <Fragment>
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </Fragment>
          )}
        </div>
      </div>
      <NavbarMenu className="py-8">
        <ChatSessions pathname={pathname} />
        <Link
          className={
            pathname === ROUTES.stt
              ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
              : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
          }
          href={ROUTES.stt}
        >
          Speech to text
        </Link>
        <Link
          className={
            pathname === ROUTES.tts
              ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
              : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
          }
          href={ROUTES.tts}
        >
          Text to speech
        </Link>

        <Link
          className={
            pathname === ROUTES.monitoring
              ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
              : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
          }
          href={ROUTES.monitoring}
        >
          Monitoring
        </Link>
        <Divider />
        <Link
          className={
            pathname === ROUTES.docs
              ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
              : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
          }
          href={ROUTES.docs}
        >
          Docs
        </Link>
        <Link
          className={
            pathname === ROUTES.keys
              ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
              : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
          }
          href={ROUTES.keys}
        >
          Keys
        </Link>
      </NavbarMenu>
    </Navbar>
  );
}
