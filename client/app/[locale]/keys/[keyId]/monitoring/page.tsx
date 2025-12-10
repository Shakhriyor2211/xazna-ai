import { getIntlayer } from "intlayer";
import { Metadata } from "next";
import { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const content = getIntlayer("key-monitoring-content", locale);

  return content.metadata;
};

export { KeyMonitoring as default } from "@/components/key-monitoring";
