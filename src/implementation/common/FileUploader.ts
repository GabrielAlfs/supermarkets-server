import { File, FileMetadata } from '@domain/common/File';

export interface FileUploader {
  uploadOne(file: File): Promise<FileMetadata>;
  uploadMany(files: Array<File>): Promise<Array<FileMetadata>>;
  removeOne(fileRelativePath: string): Promise<void>;
  removeMany(filesRelativePaths: Array<string>): Promise<void>;
}
