import useCurrentLayout from "@/hooks/useCurrentLayout";
import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import GridLayout, { Layout } from "react-grid-layout";
import { currentSpaceSetGridProps } from "@/redux/slice/layout";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Widget from "./widgets";
import DragHandle from "@/components/dragHandle";
import { positionProps } from "@/types/slice/layout";
import { cn } from "@/utils/cn";
import useFullSize from "@/hooks/useFullSize";

function DynamicLayout() {
  const { n_cols, n_rows, currentSpace, toolBarPosition } = useSelector(
    (state: StateType) => state.layout
  );
  const { mainComponentProps } = positionProps[toolBarPosition];
  const space = useCurrentLayout();
  const dispatch = useDispatch();
  const gap = 10;
  const {
    ref,
    size: { width, height },
  } = useFullSize([currentSpace, toolBarPosition]);
  const rowHeight = (height - gap * n_rows) / n_rows;
  if (!space) return null;
  const { compaction, locked, widgets } = space;
  const layout = widgets.map((w) => w.gridProps);

  const handleChange = (layout: Layout[]) => {
    dispatch(currentSpaceSetGridProps(layout));
  };

  return (
    <Box
      ref={ref}
      {...mainComponentProps}
      className={cn(
        "relative w-full overflow-hidden",
        mainComponentProps?.className
      )}
      sx={mainComponentProps?.sx}
      //
    >
      <GridLayout
        layout={layout}
        cols={n_cols}
        rowHeight={rowHeight}
        maxRows={n_rows}
        width={width}
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
        resizeHandles={["e", "n", "s", "w"]}
        //
      >
        {widgets.map((w) => (
          <Paper
            sx={{ backgroundColor: "secondaryContainer.paper" }}
            key={w.gridProps.i}>
            {!locked && <DragHandle />}
            <div className="size-full relative">
              <Widget widget={w} />
            </div>
          </Paper>
        ))}
      </GridLayout>
    </Box>
  );
}

export default DynamicLayout;
