import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { InspectionWhereInput } from "./InspectionWhereInput";
import { Type } from "class-transformer";
import { InspectionOrderByInput } from "./InspectionOrderByInput";

@ArgsType()
class InspectionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => InspectionWhereInput,
  })
  @Field(() => InspectionWhereInput, { nullable: true })
  @Type(() => InspectionWhereInput)
  where?: InspectionWhereInput;

  @ApiProperty({
    required: false,
    type: InspectionOrderByInput,
  })
  @Field(() => InspectionOrderByInput, { nullable: true })
  @Type(() => InspectionOrderByInput)
  orderBy?: InspectionOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { InspectionFindManyArgs };
