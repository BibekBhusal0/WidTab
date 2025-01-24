import { useEditor } from "novel";
import { useState } from "react";
import MenuPopover from "@/components/popoverMenu";
import MenuItem from "@mui/material/MenuItem";
import { ScrollArea } from "@/components/scrollarea";
import { Icon2RN } from "@/theme/icons";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--text-default)",
  },

  {
    name: "Red",
    color: "var(--text-red)",
  },

  {
    name: "Blue",
    color: "var(--text-blue)",
  },
  {
    name: "Green",
    color: "var(--text-green)",
  },
  {
    name: "Orange",
    color: "var(--text-orange)",
  },

  {
    name: "Gray",
    color: "var(--text-gray)",
  },
];
const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--highlight-default)",
  },

  {
    name: "Red",
    color: "var(--highlight-red)",
  },

  {
    name: "Blue",
    color: "var(--highlight-blue)",
  },
  {
    name: "Green",
    color: "var(--highlight-green)",
  },
  {
    name: "Orange",
    color: "var(--highlight-orange)",
  },
  {
    name: "Pink",
    color: "var(--highlight-pink)",
  },
  {
    name: "Gray",
    color: "var(--highlight-gray)",
  },
];

export const ColorSelector = () => {
  const [key, setKey] = useState(1);
  const handleClose = () => setKey(key + 1);
  const { editor } = useEditor();

  if (!editor) return null;
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );
  const cls = "rounded-sm border border-divider px-[6px] py-0 font-medium";

  return (
    <MenuPopover
      key={key}
      buttonProps={{
        sx: {
          color: activeColorItem?.color,
          backgroundColor: activeHighlightItem?.color,
        },
      }}
      icon={
        <div className="text-sm text-center w-full flex-center gap-2">
          A <Icon2RN icon="ri:arrow-down-s-line" className="size-4" />
        </div>
      }>
      <ScrollArea
        viewPortProps={{ className: "h-auto max-h-[200px]" }}
        scrollBarProps={{ className: "w-2" }}>
        <div className="flex flex-col">
          <div className="my-1 px-2 text-lg font-semibold">Color</div>
          {TEXT_COLORS.map(({ name, color }, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                editor.commands.unsetColor();
                name !== "Default" &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                handleClose();
              }}
              selected={name === activeColorItem?.name}
              className="px-3 py-2 gap-3">
              <div className={cls} style={{ color }}>
                A
              </div>
              <div className="text-sm">{name}</div>{" "}
            </MenuItem>
          ))}
        </div>
        <div>
          <div className="my-1 pt-1 px-2 text-lg font-semibold border-t-border border-t-2">
            Highlight
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== "Default" &&
                  editor.chain().focus().setHighlight({ color }).run();
                handleClose();
              }}
              className="px-3 py-2 gap-3"
              selected={name === activeHighlightItem?.name}>
              <div className={cls} style={{ backgroundColor: color }}>
                A
              </div>
              <div className="text-sm">{name}</div>
            </MenuItem>
          ))}
        </div>
      </ScrollArea>
    </MenuPopover>
  );
};
