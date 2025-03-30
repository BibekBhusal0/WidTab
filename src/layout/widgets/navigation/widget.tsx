import { ScrollArea } from "@/components/scrollarea";
import AllSpaces from "@/components/footer/settings/spaces/allSpaces";
import AddSpace from "@/components/footer/settings/spaces/addSpace";
import { cn } from "@/utils/cn";
import useFullSize from "@/hooks/useFullSize";

type navigationProps = JSX.IntrinsicElements["div"];
export function Navigation(props: navigationProps) {
  return (
    <ScrollArea
      viewPortProps={{
        className: cn("p-2 size-full relative", props.className),
        ...props,
      }}
    >
      <AllSpaces headerProps={{ className: "text-lg my-0 py-0" }} />
      <div className="border-t-2 p-4">
        <AddSpace />
      </div>
    </ScrollArea>
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
