import dayjs from "@/dayjsConfig";

export const generateCompleteData = (
  history: Record<string, number> = {},
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
) => {
  const data: { date: string; value: number }[] = [];
  for (
    let date = startDate;
    date.isBefore(endDate) || date.isSame(endDate);
    date = date.add(1, "day")
  ) {
    const formattedDate = date.format("YYYY-MM-DD");
    data.push({
      date: formattedDate,
      value: history[formattedDate] || 0,
    });
  }
  return data;
};
