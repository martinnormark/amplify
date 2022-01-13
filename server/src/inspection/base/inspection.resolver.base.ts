import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateInspectionArgs } from "./CreateInspectionArgs";
import { UpdateInspectionArgs } from "./UpdateInspectionArgs";
import { DeleteInspectionArgs } from "./DeleteInspectionArgs";
import { InspectionFindManyArgs } from "./InspectionFindManyArgs";
import { InspectionFindUniqueArgs } from "./InspectionFindUniqueArgs";
import { Inspection } from "./Inspection";
import { InspectionService } from "../inspection.service";

@graphql.Resolver(() => Inspection)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class InspectionResolverBase {
  constructor(
    protected readonly service: InspectionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Inspection",
    action: "read",
    possession: "any",
  })
  async _inspectionsMeta(
    @graphql.Args() args: InspectionFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Inspection])
  @nestAccessControl.UseRoles({
    resource: "Inspection",
    action: "read",
    possession: "any",
  })
  async inspections(
    @graphql.Args() args: InspectionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Inspection[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Inspection",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Inspection, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Inspection",
    action: "read",
    possession: "own",
  })
  async inspection(
    @graphql.Args() args: InspectionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Inspection | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Inspection",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Inspection)
  @nestAccessControl.UseRoles({
    resource: "Inspection",
    action: "create",
    possession: "any",
  })
  async createInspection(
    @graphql.Args() args: CreateInspectionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Inspection> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Inspection",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Inspection"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Inspection)
  @nestAccessControl.UseRoles({
    resource: "Inspection",
    action: "update",
    possession: "any",
  })
  async updateInspection(
    @graphql.Args() args: UpdateInspectionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Inspection | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Inspection",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Inspection"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Inspection)
  @nestAccessControl.UseRoles({
    resource: "Inspection",
    action: "delete",
    possession: "any",
  })
  async deleteInspection(
    @graphql.Args() args: DeleteInspectionArgs
  ): Promise<Inspection | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
