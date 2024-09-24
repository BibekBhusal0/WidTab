import useCurrentLayout from "@/hooks/useCurrentLayout";
import { StateType } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridLayout, { Layout } from "react-grid-layout";
import { currentSpaceSetGridProps } from "@/redux/slice/layout";

function DynamicLayout({ height }: { height: number }) {
  const { n_cols, n_rows } = useSelector((state: StateType) => state.layout);
  const space = useCurrentLayout();
  const dispatch = useDispatch();
  if (!space) return null;
  const gap = 10;
  const { compaction, locked, widgets } = space;
  const layout = widgets.map((w) => w.gridProps);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1500);
  const [rowHeight, setRowHeight] = useState(10);

  const handleChange = (layout: Layout[]) => {
    dispatch(currentSpaceSetGridProps(layout));
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setRowHeight(
          (containerRef.current.offsetHeight - gap * n_rows) / n_rows
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: `${height}%` }}
      className="relative w-full overflow-hidden"
      //
    >
      <GridLayout
        layout={layout}
        cols={n_cols}
        rowHeight={rowHeight}
        width={containerWidth}
        margin={[gap, gap]}
        //
        className={`size-full ${locked ? "hide-resize" : ""}`}
        isDraggable={!locked}
        isResizable={!locked}
        isDroppable={!locked}
        //
        compactType={compaction === "none" ? null : compaction}
        onLayoutChange={handleChange}
        draggableHandle=".drag-handle"
        preventCollision
        resizeHandles={["ne", "e", "n", "s", "w", "nw", "sw", "se"]}
        //
      ></GridLayout>
    </div>
  );
}

export default DynamicLayout;
