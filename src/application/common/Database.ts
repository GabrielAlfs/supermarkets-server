import { MongooseHelper } from '@infrastructure/persistence/mongoose/MongooseHelper';
import { serverLogger } from './Logger';

export class Database {
  public static async start(): Promise<void> {
    serverLogger.info('[database] Connecting...');
    await MongooseHelper.connect({
      uri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
      options: { connectTimeoutMS: 5000 },
    });
    serverLogger.info('[database] Connected!');
  }

  public static async stop(): Promise<void> {
    serverLogger.info('[database] Disconnecting...');
    await MongooseHelper.disconnect();
    serverLogger.info('[database] Disconnected!');
  }
}
