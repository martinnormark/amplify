import { Inspection as TInspection } from "../api/inspection/Inspection";

export const INSPECTION_TITLE_FIELD = "title";

export const InspectionTitle = (record: TInspection): string => {
  return record.title || record.id;
};
