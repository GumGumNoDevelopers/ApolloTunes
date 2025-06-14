export interface FileMetadata {
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
  duration?: number;
}

export interface FileFormat {
  type: string;
  bitrate: number | string;
  lossless: boolean;
  sampleRate: number | string;
}

export interface Song {
  path: string;
  name: string;
  hash: string;
  metadata: FileMetadata;
  format?: FileFormat;

  isDuplicate?: boolean; // Optional field to mark duplicates
}