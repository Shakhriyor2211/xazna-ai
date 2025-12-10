import { getIntlayer } from "intlayer";
import { Metadata } from "next";
import { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const content = getIntlayer("chatbot-content", locale);

  return content.metadata;
};

export { ChatbotSession as default } from "@/components/chatbot/session";
