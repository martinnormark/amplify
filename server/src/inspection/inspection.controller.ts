import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { InspectionService } from "./inspection.service";
import { InspectionControllerBase } from "./base/inspection.controller.base";

@swagger.ApiTags("inspections")
@common.Controller("inspections")
export class InspectionController extends InspectionControllerBase {
  constructor(
    protected readonly service: InspectionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
