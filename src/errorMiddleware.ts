/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextFunction, type Request, type Response } from "express";
// import logger from "../../logger";

export default async function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  if (error instanceof SyntaxError) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }

  console.log(`Generic Error on handling apiCall: `, error);
  return Promise.resolve(
    res.status(500).json({
      status: 500,
      message: "API Error",
    })
  );
}
