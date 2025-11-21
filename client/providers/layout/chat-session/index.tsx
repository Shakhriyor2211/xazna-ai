import { ENDPOINTS, ROUTES } from "@/shared/site";
import { getRequest } from "@/utils/axios-instance";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { RiChatSmileAiLine } from "react-icons/ri";
import { useAlertStore } from "../../alert";
import { ChatSessionProps } from "@/types";

import { PiPlus } from "react-icons/pi";
import { Divider } from "@heroui/react";
import { SessionDropdown } from "./drop-down";

export function ChatSessions({ pathname }: { pathname: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const { setAlert } = useAlertStore();
  const [sessions, setSessions] = useState<ChatSessionProps[]>([]);
  const handleVisible = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const getSessions = useCallback(async () => {
    try {
      const { data } = await getRequest({ url: ENDPOINTS.llm_session_list });
      if (data) setSessions(data);
    } catch {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        description: "Failed to load sessions.",
      }));
    }
  }, [sessions]);

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <Fragment>
      <div
        className={
          pathname.includes(ROUTES.chat)
            ? "flex items-center justify-between space-x-2 p-2 text-sm bg-primary/20 rounded-md text-green-700 font-medium"
            : "flex items-center justify-between space-x-2 p-2 text-sm rounded-md hover:bg-default-100 text-default-700 font-medium"
        }
        onClick={handleVisible}
      >
        <div className="flex items-center lg:space-x-2 cursor-pointer">
          <RiChatSmileAiLine className="hidden lg:inline h-5 w-5" />
          <span>Chat bot</span>
        </div>
        <MdArrowBackIos
          className={`h-3 w-3 transition-all duration-300 ${isVisible ? "-rotate-90" : "rotate-0"}`}
        />
      </div>
      {isVisible ? (
        <div className="space-y-2">
          <Link
            className="hover:bg-default-100 rounded-md flex items-center justify-between space-x-1 px-2 py-2 text-sm text-default-700"
            href={ROUTES.chat}
          >
            <span>New chat</span>
            <PiPlus />
          </Link>
          <Divider />
          <div className="flex flex-col mt-2 max-h-64 overflow-y-auto">
            {sessions.map((session) => (
              <Link
                key={session.id}
                className="group hover:bg-default-100 rounded-md flex items-center justify-between space-x-1 px-4 py-2 text-sm text-gray-500"
                href={`${ROUTES.chat}/${session.id}`}
              >
                <span>{session.title}</span>
                <SessionDropdown session={session} setSessions={setSessions} />
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
