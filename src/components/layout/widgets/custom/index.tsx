import { CustomWidgetType } from "@/types/slice/widgets";

function CustomWidget({ url }: CustomWidgetType) {
  return <iframe src={url} className="size-full" />;
}

export default CustomWidget;
