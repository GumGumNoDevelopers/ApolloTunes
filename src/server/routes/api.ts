import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "node:path";
import { parseFile } from "music-metadata";

export default async function apiRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> {
  fastify.get("/api", async (request: FastifyRequest, reply: FastifyReply) => {
    const lis = await scanDirectory(process.env.MUSIC_DIR as string);
    reply.send(lis);
  });
}

async function scanDirectory(dir: string): Promise<any[]> {
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
          const metadata = await parseFile(fullPath);

          result.push({
            path: fullPath,
            name: entry.name,
            metadata: {
              title: metadata.common.title || entry.name,
              artist: metadata.common.artist,
              album: metadata.common.album,
              duration: metadata.format.duration,
            },
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