import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { IErrorResponse } from "./handleError/iError.response";

const { ErrorResponse } = require("./handleError/error.response");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const prisma = new PrismaClient();
//init middleware
app.use(morgan("dev"));
// init route
app.use("/", require("./route"));

//handler Error
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new ErrorResponse("Not found", 404);
  next(error);
});

app.use(
  (error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      status: "error",
      code: statusCode,
      stack: error.stack,
      message: error.message || "Internal Server Error",
    });
  }
);
module.exports = app;