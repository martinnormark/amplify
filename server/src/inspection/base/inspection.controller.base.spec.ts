import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { InspectionController } from "../inspection.controller";
import { InspectionService } from "../inspection.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  completedDate: new Date(),
  createdAt: new Date(),
  id: "exampleId",
  plannedDate: new Date(),
  title: "exampleTitle",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  completedDate: new Date(),
  createdAt: new Date(),
  id: "exampleId",
  plannedDate: new Date(),
  title: "exampleTitle",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    completedDate: new Date(),
    createdAt: new Date(),
    id: "exampleId",
    plannedDate: new Date(),
    title: "exampleTitle",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  completedDate: new Date(),
  createdAt: new Date(),
  id: "exampleId",
  plannedDate: new Date(),
  title: "exampleTitle",
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Inspection", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: InspectionService,
          useValue: service,
        },
      ],
      controllers: [InspectionController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /inspections", async () => {
    await request(app.getHttpServer())
      .post("/inspections")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        completedDate: CREATE_RESULT.completedDate.toISOString(),
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        plannedDate: CREATE_RESULT.plannedDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /inspections", async () => {
    await request(app.getHttpServer())
      .get("/inspections")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          completedDate: FIND_MANY_RESULT[0].completedDate.toISOString(),
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          plannedDate: FIND_MANY_RESULT[0].plannedDate.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /inspections/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/inspections"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /inspections/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/inspections"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        completedDate: FIND_ONE_RESULT.completedDate.toISOString(),
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        plannedDate: FIND_ONE_RESULT.plannedDate.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
