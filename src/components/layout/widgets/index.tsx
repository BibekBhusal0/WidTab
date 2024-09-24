import { TransparentPaper } from "@/components/transparent";
import { WidgetType } from "@/types/slice/widgets";
import { forwardRef } from "react";

interface WidgetProps {
  widget: WidgetType;
  locked?: boolean;
}

const Widget = forwardRef<HTMLDivElement, WidgetProps>(
  ({ widget, locked = false }, ref) => {
    return (
      <div key={widget.gridProps.i} ref={ref} className="relative">
        <TransparentPaper className="w-full h-full">
          {!locked && (
            <div className="w-full bg-green-200 opacity-50 drag-handle h-5 absolute top-0 left-0"></div>
          )}
        </TransparentPaper>
      </div>
    );
  }
);

export default Widget;
