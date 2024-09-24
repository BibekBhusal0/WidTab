import useCurrentLayout from "@/hooks/useCurrentLayout";
import DynamicLayout from "./layout/dynamic";

function Main({ height }: { height: number }) {
  const layout = useCurrentLayout();
  if (!layout) return null;
  return <DynamicLayout height={height}></DynamicLayout>;
}

export default Main;
