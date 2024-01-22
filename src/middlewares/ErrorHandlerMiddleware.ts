import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../error/AppError";


class ErrorHandlerMiddleware {
    execute(error: Error | AppError, req: Request, res: Response, next: NextFunction) {
        if(error) {
            if(error instanceof AppError) {
                return res.status(error.status).send({ message: error.message });
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error'});
        }

        console.log(error)
        next();
    }
}

const errorHandlerMiddleware = new ErrorHandlerMiddleware();

export { errorHandlerMiddleware };