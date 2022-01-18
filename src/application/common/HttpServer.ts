import { createServer, Server } from 'http';
import { createExpressApp } from './ExpressApp';
import { serverLogger } from './Logger';

export class HttpServer {
  public static server: Server;

  private static port = process.env.SERVER_PORT || process.env.PORT;

  private static async createHttpServer(): Promise<void> {
    const expressApp = await createExpressApp();

    expressApp.set('port', HttpServer.port);

    this.server = createServer(expressApp);
  }

  public static async start(): Promise<void> {
    await this.createHttpServer();

    serverLogger.info('[http] Starting server...');
    this.server.listen(HttpServer.port, () => {
      serverLogger.info(
        `[http] Server started and listening on port ${HttpServer.port}`,
      );
    });
  }

  public static stop(): void {
    serverLogger.info('[http] Gracefully stopping the server...');

    this.server.close(() => {
      serverLogger.info('[http] Server was shut down properly!');
      process.exit(0);
    });

    setTimeout(() => {
      serverLogger.warn('[http] Not able to close all connections in time...');
      serverLogger.warn('[http] Server was shut down incorrectly!');
      process.exit(1);
    }, 12000);
  }
}
