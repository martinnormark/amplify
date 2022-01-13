import { SortOrder } from "../../util/SortOrder";

export type InspectionOrderByInput = {
  completedDate?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  plannedDate?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
