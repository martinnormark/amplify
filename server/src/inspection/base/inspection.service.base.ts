import { PrismaService } from "nestjs-prisma";
import { Prisma, Inspection } from "@prisma/client";

export class InspectionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.InspectionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InspectionFindManyArgs>
  ): Promise<number> {
    return this.prisma.inspection.count(args);
  }

  async findMany<T extends Prisma.InspectionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InspectionFindManyArgs>
  ): Promise<Inspection[]> {
    return this.prisma.inspection.findMany(args);
  }
  async findOne<T extends Prisma.InspectionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.InspectionFindUniqueArgs>
  ): Promise<Inspection | null> {
    return this.prisma.inspection.findUnique(args);
  }
  async create<T extends Prisma.InspectionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InspectionCreateArgs>
  ): Promise<Inspection> {
    return this.prisma.inspection.create<T>(args);
  }
  async update<T extends Prisma.InspectionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InspectionUpdateArgs>
  ): Promise<Inspection> {
    return this.prisma.inspection.update<T>(args);
  }
  async delete<T extends Prisma.InspectionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.InspectionDeleteArgs>
  ): Promise<Inspection> {
    return this.prisma.inspection.delete(args);
  }
}
