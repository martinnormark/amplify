import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { InspectionServiceBase } from "./base/inspection.service.base";

@Injectable()
export class InspectionService extends InspectionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
