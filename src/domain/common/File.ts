export interface File {
  extension: string;
  mimeType: string;
  size: number;
  content: ArrayBuffer;
}

export interface FileMetadata {
  relativePath: string;
  extension: string;
}
