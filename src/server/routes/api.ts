import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { scanDirectory } from "../service/scan";
import * as util from "../../shared/util/conveter";

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
      data: rescanList.map(song => util.toDbSongModel(song))
    });
  });

  fastify.get("/songs", async (request: FastifyRequest, reply: FastifyReply) => {
    const songs = await fastify.prisma.songFile.findMany({ orderBy: { name: "asc" } });
    reply.send(songs);
  });
}