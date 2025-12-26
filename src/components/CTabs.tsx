import { TabItem, Tabs } from "flowbite-react";
import type { JSX } from "preact/jsx-runtime";

export function CTabs({
  title,
  tabs,
}: {
  title: string;
  tabs: {
    label: string;
    id: string;
    content?: JSX.Element;
    isDefault?: boolean;
  }[];
}) {
  return (
    <Tabs
      className={
        '[&_button[aria-selected="true"]]:bg-dark-925/80 [&_button[aria-selected="false"]]:hover:bg-dark-925/30 [&_button[aria-selected="true"]]:backdrop-blur-2xl [&_button[aria-selected="true"]]:text-contrast'
      }
      aria-label={title}
      variant="default"
    >
      {tabs.map((tab) => (
        <TabItem key={tab.id} title={tab.label} active={tab.isDefault}>
          {tab.content}
        </TabItem>
      ))}
    </Tabs>
  );
}
