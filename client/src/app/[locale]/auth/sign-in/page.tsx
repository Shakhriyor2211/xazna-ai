import { getIntlayer } from "intlayer";
import { Metadata } from "next";
import { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const content = getIntlayer("sign-in-content", locale);

  return content.metadata;
};

export { SignIn as default } from "@/components/auth/sign-in";
