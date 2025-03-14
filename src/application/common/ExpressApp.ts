import { setupRoutes } from '@application/helpers/SetupRoutes';
import express, { Express, NextFunction, Response, Request } from 'express';
import cors from 'cors';
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
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
    }),
  );
  app.use(requestLogger);

  app.get('/', (request: Request, response: Response) =>
    response.status(200).json({
      application: 'works!',
    }),
  );

  await setupRoutes(app);

  return app;
};
