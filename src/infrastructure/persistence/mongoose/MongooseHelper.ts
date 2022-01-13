import mongoose, { connect, ConnectOptions } from 'mongoose';

export class MongooseHelper {
  public static connection: typeof mongoose;

  public static async connect({
    uri,
    options,
  }: {
    uri: string;
    options?: ConnectOptions;
  }): Promise<void> {
    if (!this.connection) {
      this.connection = await connect(uri, {
        ...options,
      });
    }
  }

  public static async disconnect(): Promise<void> {
    await this.connection.disconnect();
  }
}
