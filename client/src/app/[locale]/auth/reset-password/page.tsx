import { getIntlayer } from "intlayer";
import { Metadata } from "next";
import { LocalPromiseParams, NextPageIntlayer } from "next-intlayer";
import { ResetPassword } from "@/components/auth/reset-password";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const content = getIntlayer("reset-password-content", locale);

  return content.metadata;
};

const ResetPasswordPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  return <ResetPassword />;
};

export default ResetPasswordPage;
