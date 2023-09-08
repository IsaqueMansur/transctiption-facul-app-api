import { Body, Get, JsonController, Post } from "routing-controllers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@JsonController("/examples")
export class UserController {
  @Get("/")
  private welcome() {
    return { message: "Here is main of examples routes (GET)" };
  }

  @Get("/withData")
  private async welcomeWithData() {
    const dataTeste = await prisma.teste.findMany({ where: { id: { gt: 0 } } });
    return {
      message: "Here is method with database consult of examples routes (GET)",
      database_response: dataTeste,
    };
  }

  @Post("/")
  private async postExample(@Body() body: any) {
    await prisma.teste.create({ data: body });
    return {
      message: "Here is main of examples routes (POST)",
      your_body: body,
    };
  }
}
