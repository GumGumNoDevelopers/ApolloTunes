import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { scanDirectory } from "../service/scan";
import { markDuplicates } from "../service/duplicate";
import { SongFile, DownloadSong } from "@prisma/client";

export type SongFileInput = Omit<SongFile, "id">;

export type GenericId = {
  id: number;
}

export default async function apiRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
): Promise<void> {
  fastify.get("/rescan", async (request: FastifyRequest, reply: FastifyReply) => {
    const rescanList = await scanDirectory(process.env.MUSIC_DIR as string);

    // clear existing songs
    await fastify.prisma.songFile.deleteMany();

    // insert new songs
    await fastify.prisma.songFile.createMany({
      data: markDuplicates(rescanList)
    });
  });

  fastify.get("/songs", async (request: FastifyRequest, reply: FastifyReply) => {
    const songs = await fastify.prisma.songFile.findMany({ orderBy: { name: "asc" } });
    reply.send(songs);
  });

  fastify.get("/songs/download-list", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send(await fastify.prisma.downloadSong.findMany())
  });

  fastify.post("/songs/download-list", async (request: FastifyRequest<{ Body: DownloadSong }>, reply: FastifyReply) => {
    const { body } = request;
    delete body["id"]; // Ensure no ID is provided, as it will be auto-generated

    await fastify.prisma.downloadSong.create({ data: body });
    reply.send(await fastify.prisma.downloadSong.findMany())
  });

  // Remove a song from the download list
  fastify.delete("/songs/download-list/:id", async (request: FastifyRequest<{ Params: GenericId }>, reply: FastifyReply) => {
    const { id } = request.params;
    await fastify.prisma.downloadSong.delete({ where: { id: Number(id) } });
    reply.send(await fastify.prisma.downloadSong.findMany());
  });
}