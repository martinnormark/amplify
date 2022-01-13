import { ArgsType, Field } from "@nestjs/graphql";
import { InspectionWhereUniqueInput } from "./InspectionWhereUniqueInput";
import { InspectionUpdateInput } from "./InspectionUpdateInput";

@ArgsType()
class UpdateInspectionArgs {
  @Field(() => InspectionWhereUniqueInput, { nullable: false })
  where!: InspectionWhereUniqueInput;
  @Field(() => InspectionUpdateInput, { nullable: false })
  data!: InspectionUpdateInput;
}

export { UpdateInspectionArgs };
