import { Request, Response } from 'express';
import { IHandler } from '@presentation/common/Handler';
import { Code } from '@domain/common/Code';
import { serverLogger } from '@application/common/Logger';

export const AdaptRoute =
  (handler: IHandler) =>
  async (request: Request, response: Response): Promise<void> => {
    const payload = {
      ...(request.body || {}),
      ...(request.params || {}),
    };

    try {
      const { statusCode, body } = await handler.handle(payload);
      response.status(statusCode).json(body);
    } catch (error) {
      if (error instanceof Error) {
        response.status(Code.INTERNAL_SERVER_ERROR.code).json({
          message: Code.INTERNAL_SERVER_ERROR.message,
        });
        serverLogger.error(
          `[http] ${request.method} ${request.originalUrl} caused an internal server error\n${error.stack}`,
        );
      }
    }
  };
