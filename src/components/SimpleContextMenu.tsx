import { createElement, type RefObject } from "preact";
import type { ContextMenuAction } from "../lib/types/tables";

export const SimpleContextMenu = ({
  isVisible,
  reference,
  x,
  y,
  actions = [],
  onAction,
}: {
  isVisible: boolean;
  reference: RefObject<HTMLDivElement>;
  x?: number;
  y?: number;
  actions: ContextMenuAction[];
  onAction: (actionId: string) => void;
}) => {
  return (
    <div
      className={`min-w-[150px] fixed flex flex-col bg-dark-100 text-dark font-semibold p-2 rounded-xl border border-dark-200 ${!isVisible && "invisible"}`}
      style={{
        top: isVisible ? y : -1000,
        left: isVisible ? x : -1000,
      }}
      ref={reference}
    >
      {actions.map((action) => (
        <button
          className={
            "flex items-center gap-2 w-full text-xs text-left px-3 py-2 rounded-lg hover:bg-dark-200"
          }
          key={action.id}
          onClick={() => onAction(action.id)}
        >
          {createElement(action.icon, {
            size: 14,
            strokeWidth: 2,
          })}
          {action.label}
        </button>
      ))}
    </div>
  );
};
