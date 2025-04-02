import useCurrentLayout from "@/hooks/useCurrentLayout";
import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import GridLayout, { Layout } from "react-grid-layout";
import { currentSpaceSetGridProps } from "@/redux/slice/layout";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Widget from "./widgets";
import { positionProps } from "@/types/slice/layout";
import { cn } from "@/utils/cn";
import useFullSize from "@/hooks/useFullSize";
import useCurrentTheme from "@/hooks/useCurrentTheme";

function DynamicLayout() {
  const { n_cols, n_rows, currentSpace, toolBarPosition, locked } = useSelector(
    (state: StateType) => state.layout
  );
  const { gap = 10 } = useCurrentTheme();
  const { mainComponentProps } = positionProps[toolBarPosition];
  const space = useCurrentLayout();
  const dispatch = useDispatch();
  const {
    ref,
    size: { width, height },
  } = useFullSize([currentSpace, toolBarPosition]);
  const rowHeight = (height - gap * n_rows) / n_rows;
  if (!space) return null;
  const { widgets } = space;
  const layout = widgets.map((w) => w.gridProps);

  const handleChange = (layout: Layout[]) => {
    dispatch(currentSpaceSetGridProps(layout));
  };

  return (
    <Box
      ref={ref}
      {...mainComponentProps}
      className={cn("widgets relative w-full overflow-hidden", mainComponentProps?.className)}
      sx={{ ...mainComponentProps?.sx, marginBottom: `${gap}px` }}>
      <GridLayout
        layout={layout}
        cols={n_cols}
        rowHeight={rowHeight}
        maxRows={n_rows}
        width={width}
        margin={[gap, gap]}
        //
        className={cn("size-full", locked && "hide-resize")}
        isDraggable={!locked}
        isResizable={!locked}
        isDroppable={!locked}
        //
        onLayoutChange={handleChange}
        draggableHandle=".drag-handle"
        compactType={null}
        preventCollision
        resizeHandles={["e", "n", "s", "w"]}
        //
      >
        {widgets.map((w) => (
          <Paper
            sx={{ backgroundColor: "primaryContainer.paper" }}
            key={w.gridProps.i}
            className="relative overflow-hidden">
            {!locked && (
              <>
                <div className="drag-handle bg-primary-2 rounded-themed absolute z-10 size-full cursor-grab focus:cursor-grabbing" />
                <div className="rounded-themed pointer-events-none absolute z-30 size-full border-2" />
              </>
            )}
            <Widget widget={w} />
          </Paper>
        ))}
      </GridLayout>
    </Box>
  );
}

export default DynamicLayout;
