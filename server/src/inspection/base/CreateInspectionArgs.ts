import { ArgsType, Field } from "@nestjs/graphql";
import { InspectionCreateInput } from "./InspectionCreateInput";

@ArgsType()
class CreateInspectionArgs {
  @Field(() => InspectionCreateInput, { nullable: false })
  data!: InspectionCreateInput;
}

export { CreateInspectionArgs };
