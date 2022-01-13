import { InspectionWhereInput } from "./InspectionWhereInput";
import { InspectionOrderByInput } from "./InspectionOrderByInput";

export type InspectionFindManyArgs = {
  where?: InspectionWhereInput;
  orderBy?: InspectionOrderByInput;
  skip?: number;
  take?: number;
};
