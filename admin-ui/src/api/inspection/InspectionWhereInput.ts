import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type InspectionWhereInput = {
  completedDate?: DateTimeNullableFilter;
  id?: StringFilter;
  plannedDate?: DateTimeNullableFilter;
  title?: StringFilter;
};
