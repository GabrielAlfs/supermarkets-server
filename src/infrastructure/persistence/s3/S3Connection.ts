import { S3 } from 'aws-sdk';

export class S3Connection {
  private client: S3;

  constructor(
    private config: {
      region: string;
    },
  ) {}

  public getS3Client() {
    if (this.client) return this.client;

    return new S3({
      region: this.config.region,
    });
  }
}
