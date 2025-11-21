import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateData = (
  schema: ZodObject,
  type: "body" | "query" | "params"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[type];

    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue) => ({
        path: issue.path.join(""),
        message: issue.message,
      }));

      return res.status(400).json({
        message: "Validation Error",
        errors,
      });
    }

    req[type] = validationResult.data;

    next();
  };
};
