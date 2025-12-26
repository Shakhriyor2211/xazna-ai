import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocaleStorage } from "next-intlayer";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";

export function LocaleSwitcher() {
  const { locale, pathWithoutLocale } = useLocale();
  const { setLocale } = useLocaleStorage();

  return (
    <Dropdown placement="bottom-end" showArrow>
      <DropdownTrigger>
        <Button isIconOnly radius="full" variant="light">
          <img
            className="w-6 h-6 rounded-full"
            src={`/assets/media/images/${locale}.svg`}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownSection>
          <DropdownItem
            as="a"
            href={getLocalizedUrl(pathWithoutLocale, "uz")}
            onClick={() => setLocale("uz")}
            className={
              locale === "uz" ? "pointer-events-none" : "pointer-events-auto"
            }
            startContent={
              <img
                className="w-6 h-6 rounded-full"
                src="/assets/media/images/uz.svg"
              />
            }
            key="uz"
          >
            O'zbekcha
          </DropdownItem>
          <DropdownItem
            className={`mt-2 ${
              locale === "ru" ? "pointer-events-none" : "pointer-events-auto"
            }`}
            as="a"
            href={getLocalizedUrl(pathWithoutLocale, "ru")}
            onClick={() => setLocale("ru")}
            startContent={
              <img
                className="w-6 h-6 rounded-full"
                src="/assets/media/images/ru.svg"
              />
            }
            key="ru"
          >
            Русский
          </DropdownItem>
          <DropdownItem
            className={`mt-2 ${
              locale === "en" ? "pointer-events-none" : "pointer-events-auto"
            }`}
            as="a"
            href={getLocalizedUrl(pathWithoutLocale, "en")}
            onClick={() => setLocale("en")}
            startContent={
              <img
                className="w-6 h-6 rounded-full"
                src="/assets/media/images/en.svg"
              />
            }
            key="en"
          >
            English
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
