"use client";
import { ROUTES } from "@/shared/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuBookText, LuScanText } from "react-icons/lu";
import { RiVoiceprintLine } from "react-icons/ri";
import { PiKey, PiPresentationChart } from "react-icons/pi";

import { LogoIcon } from "@/utils/icons";

import { ChatSessions } from "./chat-session";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-full p-4 border-r border-default-200 w-64 flex-col bg-white dark:bg-black space-y-6">
      <div className="ml-2">
        <Link href={ROUTES.main} className="flex gap-x-2 items-center">
          <LogoIcon height={32} />
          <span className="uppercase font-semibold">xazna ai</span>
        </Link>
      </div>
      <div>
        <h3 className="text-sm text-default-500 mb-2 mx-2">Playground</h3>
        <div className="space-y-2">
          <ChatSessions pathname={pathname} />
          <Link
            className={
              pathname === ROUTES.stt
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={ROUTES.stt}
          >
            <RiVoiceprintLine className="h-5 w-5" />
            <span>Speech to text</span>
          </Link>
          <Link
            className={
              pathname === ROUTES.tts
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={ROUTES.tts}
          >
            <LuScanText className="h-5 w-5" />
            <span>Text to speech</span>
          </Link>
          <Link
            className={
              pathname === ROUTES.monitoring
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={ROUTES.monitoring}
          >
            <PiPresentationChart className="h-5 w-5" />
            <span>Monitoring</span>
          </Link>
        </div>
        <h3 className="text-sm text-default-500 mb-2 mx-2 mt-6">Development</h3>
        <div className="space-y-2">
          <Link
            className={
              pathname === ROUTES.docs
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={"#"}
          >
            <LuBookText className="h-5 w-5" />
            <span>Docs</span>
          </Link>
          <Link
            className={
              pathname === ROUTES.docs
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={"#"}
          >
            <PiKey className="h-5 w-5" />
            <span>Keys</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
