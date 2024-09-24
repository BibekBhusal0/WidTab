// import { TransparentPaper } from "@/components/transparent";
import { WidgetType } from "@/types/slice/widgets";
import { forwardRef } from "react";

interface WidgetProps {
  widget: WidgetType;
  locked?: boolean;
}

const Widget = forwardRef<HTMLDivElement, WidgetProps>(
  ({ widget, locked = false }, ref) => {
    return (
      <div className="bg-red-200 size-full" key={widget.gridProps.i} ref={ref}>
        {!locked && (
          <div className="w-full bg-green-200 opacity-15 drag-handle h-5 absolute top-0 left-0"></div>
        )}
      </div>
    );
  }
);

export default Widget;
