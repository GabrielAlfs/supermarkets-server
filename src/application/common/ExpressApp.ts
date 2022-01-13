import { setupRoutes } from '@application/helpers/SetupRoutes';
import express, { Express, NextFunction, Response, Request } from 'express';
import { serverLogger } from './Logger';

const requestLogger = (request: Request, _: Response, next: NextFunction) => {
  serverLogger.info(
    `[http] ${request.method} ${request.originalUrl} by (${
      request.ip
    }@${new Date(Date.now()).toISOString()})`,
  );
  next();
};

export const createExpressApp = async (): Promise<Express> => {
  const app = express();

  app.use(express.json());

  app.use(requestLogger);

  await setupRoutes(app);

  return app;
};
