"use client";
import { Layout } from "@/providers/layout";
import { useParams, usePathname, useRouter } from "next/navigation";
import { SessionForm } from "./form";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRequest, postRequest } from "@/utils/axios-instance";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { useAlertStore } from "@/providers/alert";
import { SessionMessage } from "./message";
import { ChatMessageProps } from "@/types";

export function ChatSession() {
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
        url: `${ENDPOINTS.chat_message_list}/${sessionId}`,
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

    ws.current = new WebSocket(
      `ws:localhost:8000${ENDPOINTS.ws_client_base}/${ENDPOINTS.chat_message}/${sessionId}`
    );

    ws.current.onmessage = async (event) => {
      const { status, token, message } = JSON.parse(event.data);

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
    <Layout title="Chatbot">
      <div className="py-4 sm:py-8 space-y-8 flex flex-col justify-center h-full">
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
    </Layout>
  );
}
