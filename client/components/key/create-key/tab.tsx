import { Tab, Tabs } from "@heroui/react";

interface CreateKeyPermissionsProps {
  title: string;
  tabs: { key: string; title: string }[];
}

export function CreateKeyPermissions({
  title,
  tabs,
}: CreateKeyPermissionsProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <h3 className="text-sm">{title}</h3>
      <Tabs size="sm" aria-label="Options">
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title}></Tab>
        ))}
      </Tabs>
    </div>
  );
}
