import { Database } from './common/Database';
import { HttpServer } from './common/HttpServer';
import { serverLogger } from './common/Logger';

export class Server {
  public static async start(): Promise<void> {
    try {
      await Database.start();
      await HttpServer.start();
    } catch (error) {
      serverLogger.error(error);
    }
  }

  public static async stop(): Promise<void> {
    await Database.stop();
    HttpServer.stop();
  }
}
