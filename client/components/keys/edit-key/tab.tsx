import { Tab, Tabs } from "@heroui/react";
import { Key } from "@react-types/shared";

interface EditKeyPermissionsProps {
  title: string;
  tabs: { key: string; title: string }[];
  defaultKey: string;
  handleChange: (key: Key) => void;
}

export function EditKeyPermissions({
  title,
  tabs,
  defaultKey,
  handleChange,
}: EditKeyPermissionsProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <h3 className="text-sm">{title}</h3>
      <Tabs
        defaultSelectedKey={defaultKey}
        onSelectionChange={handleChange}
        size="sm"
        aria-label="Options"
      >
        {tabs.map((tab) => (
          <Tab className="uppercase" key={tab.key} title={tab.title}></Tab>
        ))}
      </Tabs>
    </div>
  );
}
