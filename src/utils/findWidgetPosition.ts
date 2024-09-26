import { WidgetType } from "@/types/slice/widgets";

export function fits(
  widgets: WidgetType[],
  row: number,
  col: number,
  w: number = 1,
  h: number = 1,
  maxCols: number = 12,
  maxRows: number = 6
): boolean {
  const positions = Array.from({ length: maxRows }, () =>
    Array(maxCols).fill(false)
  );

  widgets.forEach((widget) => {
    const { x, y, w: widgetW, h: widgetH } = widget.gridProps;
    for (let i = 0; i < widgetH; i++) {
      for (let j = 0; j < widgetW; j++) {
        if (y + i < maxRows && x + j < maxCols) {
          positions[y + i][x + j] = true;
        }
      }
    }
  });

  if (row + h > maxRows || col + w > maxCols) return false;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (positions[row + i][col + j]) return false;
    }
  }

  return true;
}

export function findNextAvailablePosition(
  widgets: WidgetType[],
  maxCols: number = 12,
  maxRows: number = 8,
  w: number = 1,
  h: number = 1
) {
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      if (fits(widgets, row, col, w, h, maxCols, maxRows)) {
        return { x: col, y: row, w, h, i: "" };
      }
    }
  }
  return null;
}
