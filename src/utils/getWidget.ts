import { allWidgetsType } from "@/types/slice/widgets";

export const widgetDimensions: Record<
  allWidgetsType,
  {
    minW: number;
    maxW?: number;
    maxH?: number;
    minH: number;
    w: number;
    h: number;
  }
> = {
  "habit-tracker": { minW: 3, minH: 2, w: 3, h: 2 },
  todo: { minW: 3, minH: 5, w: 3, h: 5 },
  bookmark: { minW: 2, minH: 2, w: 2, h: 2 },
  clock: { minW: 3, minH: 3, w: 3, h: 3, maxH: 5, maxW: 5 },
  search: { minW: 4, minH: 2, w: 4, h: 2, maxH: 2 },
  custom: { minW: 1, minH: 1, w: 1, h: 1 },
};
