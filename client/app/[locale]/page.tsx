import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/sidebar";
import { getIntlayer } from "intlayer";
import { Metadata } from "next";
import { LocalPromiseParams, type NextPageIntlayer } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const content = getIntlayer("main-content", locale);

  return content.metadata;
};

const MainPage: NextPageIntlayer = async () => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Landing" />
      </div>
    </main>
  );
};

export default MainPage;
