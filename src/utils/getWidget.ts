import { allWidgetsType } from "@/types/slice/widgets";
import { Layout } from "react-grid-layout";

export const widgetDimensions: Record<allWidgetsType, Partial<Layout>> = {
  "habit-tracker": { minW: 4, minH: 2, maxH: 2, maxW: 8 },
  "habit-tracker-stats-single": { minW: 4, minH: 3 },
  "habit-tracker-stats-all": { minW: 4, minH: 3 },
  todo: { minW: 3, minH: 4 },
  bookmark: { minW: 2, minH: 2 },
  clock: { maxH: 5, maxW: 8, minH: 1, minW: 2 },
  search: { maxH: 1, minW: 4 },
  custom: { minW: 1, minH: 1 },
  calendar: { minH: 4, minW: 3, isResizable: false },
  navigation: { minH: 2, minW: 4, maxH: 3, maxW: 5 },
};
