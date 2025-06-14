import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { scanDirectory } from "../service/scan";
import { markDuplicates } from "../service/duplicate";
import { SongFile } from "@prisma/client";

export type SongFileInput = Omit<SongFile, "id">;

export default async function apiRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> {
  fastify.get("/rescan", async (request: FastifyRequest, reply: FastifyReply) => {
    const rescanList = await scanDirectory(process.env.MUSIC_DIR as string);

    // clear existing songs
    await fastify.prisma.songFile.deleteMany({});

    // insert new songs
    await fastify.prisma.songFile.createMany({
      data: markDuplicates(rescanList)
    });
  });

  fastify.get("/songs", async (request: FastifyRequest, reply: FastifyReply) => {
    const songs = await fastify.prisma.songFile.findMany({ orderBy: { name: "asc" } });
    reply.send(songs);
  });
}