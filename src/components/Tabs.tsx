import type { ComponentProps, JSX } from "preact";
import { useState } from "preact/hooks";

export const TabButton = ({
  id,
  label,
  isActive = false,
  ...props
}: {
  id: string;
  label: string;
  isActive: boolean;
} & ComponentProps<"button">) => {
  return (
    <button
      key={id}
      className={`py-3 font-semibold ${isActive ? "bg-dark-925 rounded-2xl border border-dark-100 px-5" : "px-3"}`}
      {...props}
    >
      {label}
    </button>
  );
};

export const Tabs = ({
  tabs,
}: {
  tabs: {
    label: string;
    id: string;
    content?: JSX.Element;
    isDefault?: boolean;
  }[];
}) => {
  const [activeTab, setActiveTab] = useState(
    tabs?.find((tab) => tab.isDefault) || tabs[0],
  );
  return (
    <>
      <div className={"mb-4 flex items-center gap-2"}>
        {/* Always show active tab as the first tab */}
        {activeTab && (
          <TabButton
            id={activeTab.id}
            label={activeTab.label}
            isActive={true}
            onClick={() => setActiveTab(activeTab)}
          />
        )}
        <div className={"flex overflow-x-auto thin-scrollbar"}>
          {tabs
            .filter((tab) => tab.id !== activeTab?.id)
            .map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                isActive={false}
                onClick={() => setActiveTab(tab)}
              />
            ))}
        </div>
      </div>
      {activeTab?.content}
    </>
  );
};
