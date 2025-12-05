"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { SessionForm } from "./form";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRequest, postRequest } from "@/utils/axios-instance";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { useAlertStore } from "@/providers/alert";
import { SessionMessage } from "./message";
import { ChatMessageProps } from "@/types";
import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/sidebar";

const HTTP_SERVER_URL = process.env.NEXT_PUBLIC_HTTP_SERVER_URL;

export function ChatbotSession() {
  const { sessionId } = useParams();
  const { setAlert } = useAlertStore();
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const messagesRef = useRef<ChatMessageProps[]>([]);
  const path = usePathname();
  const { push } = useRouter();

  const ws = useRef<WebSocket | null>(null);

  const handleSenMessage = useCallback(
    async (value: string) => {
      const v = value.trim();
      if (v === "") return;

      setAutoScrollEnabled(true);
      messagesRef.current = [
        ...messagesRef.current,
        {
          role: "user",
          content: v,
        },
      ];
      setMessages([...messagesRef.current]);

      try {
        ws.current?.send(
          JSON.stringify({ content: v, action: "message", model: "Base" })
        );
      } catch (err) {
        setAlert((prev) => ({
          ...prev,
          isVisible: true,
          color: "danger",
          description: "Failed to send message.",
        }));
      }
    },
    [ws, messagesRef]
  );

  const refreshToken = useCallback(async () => {
    try {
      const { data } = await postRequest({ url: ENDPOINTS.refresh_token });
      if (data) handleWsReonnect();
    } catch {
      push(`${ROUTES.sign_in}?next=${path}`);
    }
  }, [ws]);

  const getMessages = useCallback(async () => {
    try {
      const { data } = await getRequest({
        url: `${ENDPOINTS.llm_message_list}/${sessionId}`,
      });

      if (data) {
        messagesRef.current = data;
        setMessages(data);
      }
    } catch (err) {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        description: "Failed to load session messages.",
      }));
    }
  }, [sessionId]);

  const handleWsConnect = useCallback(() => {
    if (ws.current !== null) ws.current.close();

    const url =
      process.env.NEXT_PUBLIC_NODE_ENV === "dev"
        ? `${HTTP_SERVER_URL}${ENDPOINTS.ws_client_base}/${ENDPOINTS.llm_message}/${sessionId}`
        : `${ENDPOINTS.ws_client_base}/${ENDPOINTS.llm_message}/${sessionId}`;

    ws.current = new WebSocket(url);

    ws.current.onmessage = async (event) => {
      const { status, token, message } = JSON.parse(event.data);
      console.log(status);

      if (status === 201) {
        messagesRef.current = [
          ...messagesRef.current,
          { role: "assistant", content: "" },
        ];
        setMessages([...messagesRef.current]);
        setIsStreaming(true);
      } else if (status === 206) {
        const lastMessage = messagesRef.current[messagesRef.current.length - 1];
        lastMessage.content += token;

        messagesRef.current = [
          ...messagesRef.current.slice(0, -1),
          lastMessage,
        ];
        setMessages([...messagesRef.current]);
      } else if (status === 200) {
        setIsStreaming(false);
      } else if (status === 401) {
        refreshToken();
      } else if (status === 403 && message) {
        setAlert((prev) => ({
          ...prev,
          isVisible: true,
          color: "danger",
          title: "",
          description: message,
        }));
      } else {
        setAlert((prev) => ({
          ...prev,
          isVisible: true,
          color: "danger",
          title: "",
          description: "Failed to receive message.",
        }));
      }
    };

    ws.current.onclose = () => {};

    ws.current.onerror = () => {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        description: "Failed to establish connection.",
      }));
    };

    return ws.current;
  }, []);

  const handleWsReonnect = useCallback(() => {
    handleWsConnect();

    if (ws.current === null) return;

    ws.current.onopen = () => {
      const lastMessage = messagesRef.current[messagesRef.current.length - 1];
      if (lastMessage && lastMessage.role === "user") {
        messagesRef.current = [...messagesRef.current.slice(0, -1)];
        handleSenMessage(lastMessage.content);
      }
    };
  }, [ws, messagesRef]);

  useEffect(() => {
    handleWsConnect();
    if (ws.current === null) return;

    ws.current.onopen = () => {
      getMessages();
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Chatbot" />

        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto py-4 sm:py-8 space-y-8 flex flex-col justify-center">
          <SessionMessage
            messages={messages}
            setAutoScrollEnabled={setAutoScrollEnabled}
            autoScrollEnabled={autoScrollEnabled}
          />
          <SessionForm
            ws={ws}
            handleSenMessage={handleSenMessage}
            setIsStreaming={setIsStreaming}
            isStreaming={isStreaming}
          />
        </div>
      </div>
    </main>
  );
}
