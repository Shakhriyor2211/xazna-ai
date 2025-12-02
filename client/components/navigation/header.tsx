"use client";
import { useUserStore } from "@/hooks/user";
import { ROUTES } from "@/shared/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { ThemeSwitch } from "./theme-switch";
import { Skeleton } from "@heroui/skeleton";
import { Navbar, NavbarMenu, NavbarMenuToggle } from "@heroui/react";
import { Divider } from "@heroui/divider";
import { ChatSessions } from "./sidebar/chat-session";
import { LanguageSwitch } from "./language-switch";
import { UserMenu } from "./user-menu";

export function Header({ title }: { title: string }) {
  const pathname = usePathname();
  const { user } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <div className="flex items-center space-x-2">
                <ThemeSwitch />
                <LanguageSwitch />
              </div>
              <UserMenu />
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
