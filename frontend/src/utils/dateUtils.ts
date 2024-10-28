import { format } from "date-fns";
import { EMPTY_PLACEHOLDER } from "~/constants/general.ts";

export const checkDate = (date?: Date | null) => {
  if (!date) {
    return false;
  }

  const parsed = new Date(date);
  return parsed.toString() !== "Invalid Date";
};

export const yyyymmddFormat = (date?: Date | null) => {
  if (!checkDate(date)) {
    return EMPTY_PLACEHOLDER;
  }

  return format(date, "yyyy-MM-dd");
};
