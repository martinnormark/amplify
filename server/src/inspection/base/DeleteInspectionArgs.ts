import { ArgsType, Field } from "@nestjs/graphql";
import { InspectionWhereUniqueInput } from "./InspectionWhereUniqueInput";

@ArgsType()
class DeleteInspectionArgs {
  @Field(() => InspectionWhereUniqueInput, { nullable: false })
  where!: InspectionWhereUniqueInput;
}

export { DeleteInspectionArgs };
