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
import { ElementRef, forwardRef } from "react";

type moreScrollAreaProps = {
  viewPortProps?: Partial<ScrollAreaViewportProps>;
  cornerProps?: Partial<ScrollAreaCornerProps>;
  scrollBarProps?: Partial<ScrollAreaScrollbarProps>;
};

const ScrollArea = forwardRef<
  ElementRef<typeof Root>,
  ScrollAreaProps & moreScrollAreaProps
>(
  (
    {
      className,
      children,
      viewPortProps,
      cornerProps,
      scrollBarProps,
      ...props
    },
    ref
  ) => (
    <Root {...props} className={cn("relative overflow-hidden", className)}>
      <Viewport
        ref={ref}
        {...viewPortProps}
        className={cn("size-full rounded-[inherit]", viewPortProps?.className)}>
        {children}
      </Viewport>
      <ScrollBar {...scrollBarProps} />
      <Corner {...cornerProps} />
    </Root>
  )
);
ScrollArea.displayName = Root.displayName;

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaScrollbar>,
  ScrollAreaScrollbarProps
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors p-[1px]",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent",
      className
    )}
    {...props}>
    <ScrollAreaThumb className="relative flex-1 rounded-full bg-divider" />
  </ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
