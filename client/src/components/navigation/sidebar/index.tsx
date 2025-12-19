"use client";
import { ROUTES } from "@/shared/site";
import { LuBookText, LuScanText } from "react-icons/lu";
import { RiVoiceprintLine } from "react-icons/ri";
import { PiKey, PiPresentationChart } from "react-icons/pi";
import { LogoIcon } from "@/utils/icons";
import { ChatSessionList } from "../../chatbot/session/list";
import { useIntlayer, useLocale } from "next-intlayer";
import { Link } from "@/utils/link";

export function Sidebar() {
  const { pathWithoutLocale } = useLocale();
  const content = useIntlayer("navigation-content");

  return (
    <aside className="hidden lg:flex h-full p-4 border-r border-default-200 w-64 flex-col bg-white dark:bg-black space-y-6">
      <div className="ml-2">
        <Link
          href={ROUTES.main}
          className="flex gap-x-2 items-center"
          label="xazna ai"
        >
          <LogoIcon height={32} />
          <span className="uppercase font-semibold">xazna ai</span>
        </Link>
      </div>
      <div>
        <h3 className="text-sm text-default-500 mb-2 mx-2">
          {content.sidebar.playground.title}
        </h3>
        <div className="space-y-2">
          <ChatSessionList
            pathname={pathWithoutLocale}
            title={content.sidebar.playground.chatbot.title.value}
            new_session={content.sidebar.playground.chatbot.new_session.value}
          />
          <Link
            className={
              pathWithoutLocale === ROUTES.stt
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={ROUTES.stt}
            label="stt"
          >
            <RiVoiceprintLine className="h-5 w-5" />
            <span>{content.sidebar.playground.stt}</span>
          </Link>
          <Link
            className={
              pathWithoutLocale === ROUTES.tts
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={ROUTES.tts}
            label="tts"
          >
            <LuScanText className="h-5 w-5" />
            <span>{content.sidebar.playground.tts}</span>
          </Link>
          <Link
            className={
              pathWithoutLocale === ROUTES.monitoring
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={ROUTES.monitoring}
            label="monitoring"
          >
            <PiPresentationChart className="h-5 w-5" />
            <span>{content.sidebar.playground.monitoring}</span>
          </Link>
        </div>
        <h3 className="text-sm text-default-500 mb-2 mx-2 mt-6">
          {content.sidebar.development.title}
        </h3>
        <div className="space-y-2">
          <Link
            className={
              pathWithoutLocale === ROUTES.docs
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={ROUTES.docs}
            label="docs"
          >
            <LuBookText className="h-5 w-5" />
            <span>{content.sidebar.development.docs}</span>
          </Link>
          <Link
            className={
              pathWithoutLocale === ROUTES.keys
                ? "flex items-center space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
                : "flex items-center space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
            }
            href={ROUTES.keys}
            label="keys"
          >
            <PiKey className="h-5 w-5" />
            <span>{content.sidebar.development.keys}</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
