import { File, FileMetadata } from '@domain/common/File';
import { FileUploader } from '@implementation/common/FileUploader';
import { v4 } from 'uuid';
import { S3Connection } from './S3Connection';

export class S3MediaFileUploader implements FileUploader {
  constructor(
    private readonly s3Connection: S3Connection,
    private readonly bucket: string,
  ) {}

  async uploadOne(file: File): Promise<FileMetadata> {
    const key = `${v4()}.${file.extension}`;

    await this.s3Connection
      .getS3Client()
      .putObject({
        Bucket: this.bucket,
        Key: key,
        Body: file.content,
        ContentType: file.mimeType,
        ACL: 'public-read',
      })
      .promise();

    return {
      relativePath: key,
      extension: file.extension,
    };
  }

  async removeOne(fileRelativePath: string): Promise<void> {
    await this.s3Connection
      .getS3Client()
      .deleteObject({ Bucket: this.bucket, Key: fileRelativePath })
      .promise();
  }

  async uploadMany(files: Array<File>): Promise<Array<FileMetadata>> {
    return Promise.all(files.map(async (file) => this.uploadOne(file)));
  }

  async removeMany(filesRelativePaths: Array<string>): Promise<void> {
    await Promise.all(
      filesRelativePaths.map(async (fileRelativePath) =>
        this.removeOne(fileRelativePath),
      ),
    );
  }
}
