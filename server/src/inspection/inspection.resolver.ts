import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { InspectionResolverBase } from "./base/inspection.resolver.base";
import { Inspection } from "./base/Inspection";
import { InspectionService } from "./inspection.service";

@graphql.Resolver(() => Inspection)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class InspectionResolver extends InspectionResolverBase {
  constructor(
    protected readonly service: InspectionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
