import { S3 } from 'aws-sdk';

export class S3Connection {
  private client: S3;

  constructor(
    private readonly config: {
      region: string;
    },
  ) {}

  public getS3Client() {
    if (this.client) return this.client;

    this.client = new S3({
      region: this.config.region,
    });

    return this.client;
  }
}
