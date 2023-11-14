import { Request, Response, NextFunction } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import jwt from "jsonwebtoken";

export class MiddlewareTokenRequired implements ExpressMiddlewareInterface {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { headers } = req;

      const token = headers.authorization?.split(" ")[0];

      const whiteToken = "123456";
      if (token !== whiteToken) {
        return res.status(401).json({ message: "Token inválido" });
      }

      next();
    } catch (Error: any) {
      return res.status(401).json({ message: "Token inválido" });
    }
  }
}
