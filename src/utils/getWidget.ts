import { allWidgetsType } from "@/types/slice/widgets";

export const widgetDimensions: Record<
  allWidgetsType,
  {
    minW?: number;
    maxW?: number;
    maxH?: number;
    minH?: number;
    w: number;
    h: number;
  }
> = {
  "habit-tracker": { minW: 3, minH: 2, w: 3, h: 2 },
  todo: { minW: 3, minH: 4, w: 3, h: 4 },
  bookmark: { minW: 2, minH: 2, w: 2, h: 2 },
  clock: { w: 3, h: 3, maxH: 5, maxW: 8, minH: 1, minW: 2 },
  search: { maxH: 1, minW: 4, w: 4, h: 1 },
  custom: { minW: 1, minH: 1, w: 1, h: 1 },
  calendar: { w: 3, h: 4, minH: 4, minW: 3, maxH: 4, maxW: 3 },
};
