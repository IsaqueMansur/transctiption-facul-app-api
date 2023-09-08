import { Body, Get, JsonController, Post } from "routing-controllers";
import { PrismaClient } from "@prisma/client";
import { IUserProtocol } from "../interfaces/IUser";

const prisma = new PrismaClient();

@JsonController("/users")
export class UserController {
  @Post("/")
  private async createUser(@Body() body: IUserProtocol) {
    try {
      const newUser = await prisma.users.create({ data: body });
      return {
        msg: `Usuário '${body.name} (${newUser.id})' criado com sucesso`,
      };
    } catch (e: any) {
      if (e.code && e.code === "P2002") {
        return {
          msg: `Já existe um usuário cadastrado com o email fornecido (${body.email})`,
        };
      }
    }
  }

  @Get("/all")
  private async getAllUsers() {
    try {
      const users = await prisma.users.findMany({
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      return users;
    } catch {
      return { msg: "Falha ao baixar usuários" };
    }
  }
}
