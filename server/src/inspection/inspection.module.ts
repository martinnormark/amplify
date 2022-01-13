import { Module } from "@nestjs/common";
import { InspectionModuleBase } from "./base/inspection.module.base";
import { InspectionService } from "./inspection.service";
import { InspectionController } from "./inspection.controller";
import { InspectionResolver } from "./inspection.resolver";

@Module({
  imports: [InspectionModuleBase],
  controllers: [InspectionController],
  providers: [InspectionService, InspectionResolver],
  exports: [InspectionService],
})
export class InspectionModule {}
