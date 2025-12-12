import { Tab, Tabs } from "@heroui/react";
import { Key } from "@react-types/shared";

interface CreateKeyPermissionsProps {
  title: string;
  tabs: { key: string; title: string }[];
  handleChange: (key: Key) => void;
}

export function CreateKeyPermissions({
  title,
  tabs,
  handleChange,
}: CreateKeyPermissionsProps) {
  return (
    <div className="sm:flex items-center justify-between space-y-2 sm:space-x-4">
      <h3 className="text-sm">{title}</h3>
      <Tabs onSelectionChange={handleChange} size="sm" aria-label="Options">
        {tabs.map((tab) => (
          <Tab className="uppercase" key={tab.key} title={tab.title} />
        ))}
      </Tabs>
    </div>
  );
}
