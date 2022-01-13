import { serverLogger } from '@application/common/Logger';
import { Express, Router } from 'express';
import { readdir } from 'fs';
import path from 'path';
import { promisify } from 'util';

const routesPath = path.resolve(__dirname, '..', 'routes');

export const setupRoutes = async (app: Express): Promise<void> => {
  const router = Router();
  app.use(router);

  const readdirAsync = promisify(readdir);

  const routeFiles = await readdirAsync(routesPath);

  serverLogger.info('[http] Loading routes...');
  routeFiles.map(async (fileName) => {
    serverLogger.info(
      `[http] ${fileName.replace('.js', '').toLowerCase()} routes loaded!`,
    );

    (await import(path.resolve(routesPath, fileName))).default(router);
  });
};
