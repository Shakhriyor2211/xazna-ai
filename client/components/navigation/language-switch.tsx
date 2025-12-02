import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";

export function LanguageSwitch() {
  return (
    <Dropdown placement="bottom-end" showArrow>
      <DropdownTrigger>
        <Button isIconOnly radius="full" variant="light">
          <img
            className="w-6 h-6 rounded-full"
            src="/assets/media/images/uz.svg"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownSection>
          <DropdownItem
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
            className="mt-2"
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
            className="mt-2"
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
