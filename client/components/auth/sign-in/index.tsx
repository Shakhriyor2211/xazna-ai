"use client";
import Link from "next/link";
import { RegularSignIn } from "./regular";
import { GoogleSignIn } from "./google";
import { ROUTES } from "@/shared/site";
import { LogoIcon } from "@/utils/icons";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { LocaleSwitcher } from "@/components/navigation/header/locale-switcher";

export function SignIn() {
  const content = useIntlayer("signin-content");

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner color="primary" />
        </div>
      }
    >
      <div className="h-screen flex items-center justify-center bg-white dark:bg-none dark:bg-black sm:dark:bg-neutral-900 sm:bg-gradient-to-b from-black to-primary">
        <div className="absolute right-4 top-4">
          <LocaleSwitcher />
        </div>
        <div className="container sm:w-[450px] sm:bg-white sm:dark:bg-black p-4 sm:p-8 sm:rounded-lg sm:shadow-md">
          <div className="hidden sm:flex justify-end space-x-2 items-center">
            <LogoIcon height={32} />
            <span className="uppercase font-semibold">xazna ai</span>
          </div>
          <h1 className="text-2xl font-semibold mb-6 sm:mb-8 sm:mt-8 text-center">
            {content.title}
          </h1>
          <RegularSignIn />
          <div className="flex items-center space-x-2 my-6">
            <span className="flex-1 border-t border-default-300" />
            <span className="uppercase text-sm text-default-500">
              {content.or}
            </span>
            <hr className="flex-1 border-t border-default-300" />
          </div>
          <GoogleSignIn />
          <p className="text-center space-x-1 mt-4">
            <span className="text-sm text-default-500">
              {content.signup.description}
            </span>
            <Link href={ROUTES.sign_up} className="text-sm text-blue-600">
              {content.signup.title}
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
}
