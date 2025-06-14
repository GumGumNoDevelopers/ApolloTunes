import fs from "fs";
import path from "node:path";
import { createHash } from "crypto";
import { IAudioMetadata, parseFile } from "music-metadata";
import { Song } from "../../shared/models/Song";

async function calculateFileHash(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("error", (err) => reject(err));
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

export async function scanDirectory(dir: string): Promise<Song[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const result: any[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await scanDirectory(fullPath);
      result.push(...nested);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".mp3", ".flac", ".wav", ".ogg", ".opus"].includes(ext)) {
        try {
          const metadata: IAudioMetadata = await parseFile(fullPath);
          const hash = await calculateFileHash(fullPath);

          result.push({
            path: fullPath,
            name: entry.name,
            hash: hash,
            metadata: {
              title: metadata.common.title || entry.name,
              artist: metadata.common.artist,
              album: metadata.common.album,
              year: metadata.common.year,
              duration: metadata.format.duration,
            },
            format: {
              type: metadata.format.codec || "unknown",
              bitrate: metadata.format.bitrate || "unknown",
              lossless: metadata.format.lossless || false,
              sampleRate: metadata.format.sampleRate || "unknown",
            }
          });
        } catch (e) {
          result.push({
            path: fullPath,
            name: entry.name,
            metadata: { error: "Failed to read metadata" },
          });
        }
      }
    }
  }

  return result;
}