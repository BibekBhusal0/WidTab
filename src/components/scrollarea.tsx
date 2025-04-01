import {
  Root,
  Viewport,
  Corner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewportProps,
  ScrollAreaCornerProps,
  ScrollAreaProps,
  ScrollAreaScrollbarProps,
} from "@radix-ui/react-scroll-area";
import { cn } from "@/utils/cn";

type moreScrollAreaProps = {
  viewPortProps?: Partial<ScrollAreaViewportProps>;
  cornerProps?: Partial<ScrollAreaCornerProps>;
  scrollBarProps?: Partial<ScrollAreaScrollbarProps>;
};

const ScrollArea = ({
  className,
  children,
  viewPortProps,
  cornerProps,
  scrollBarProps,
  ...props
}: ScrollAreaProps & moreScrollAreaProps) => (
  <Root {...props} className={cn("relative overflow-hidden", className)}>
    <Viewport
      {...viewPortProps}
      className={cn("size-full rounded-[inherit]", viewPortProps?.className)}>
      {children}
    </Viewport>
    <ScrollBar {...scrollBarProps} />
    <Corner {...cornerProps} />
  </Root>
);
ScrollArea.displayName = Root.displayName;

const ScrollBar = ({ className, orientation = "vertical", ...props }: ScrollAreaScrollbarProps) => {
  return (
    <ScrollAreaScrollbar
      orientation={orientation}
      className={cn(
        "flex touch-none p-[1px] transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}>
      <ScrollAreaThumb className="bg-divider relative flex-1 rounded-full" />
    </ScrollAreaScrollbar>
  );
};
ScrollBar.displayName = ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
