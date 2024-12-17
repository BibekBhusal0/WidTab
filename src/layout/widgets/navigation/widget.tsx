import { ScrollBar } from "@/components/scrollarea";
import { Root, Viewport } from "@radix-ui/react-scroll-area";
import AllSpaces from "@/components/footer/settings/spaces/allSpaces";
import AddSpace from "@/components/footer/settings/spaces/addSpace";
import { cn } from "@/utils/cn";
import useFullSize from "@/hooks/useFullSize";

type navigationProps = JSX.IntrinsicElements["div"];
export function Navigation(props: navigationProps) {
  return (
    <Root className="overflow-hidden">
      <Viewport
        {...props}
        className={cn("p-2 size-full relative", props.className)}>
        <AllSpaces headerProps={{ className: "text-lg my-0 py-0" }} />
        <div className="border-divider border-t-2 p-4">
          <AddSpace />
        </div>
      </Viewport>
      <ScrollBar />
    </Root>
  );
}

function NavigationWidget() {
  const { ref, size } = useFullSize();

  return (
    <div ref={ref} className="size-full">
      <Navigation style={size} />
    </div>
  );
}

export default NavigationWidget;
