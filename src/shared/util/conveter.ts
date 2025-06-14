// ...existing code...

// Prisma type import (adjust path if needed)
import { SongFile as PrismaSongFile } from "../../../node_modules/@prisma/client";
import { Song } from "../models/Song";

// Convert from Song (app model) to Prisma DB model
export function toDbSongModel(song: Song): Omit<PrismaSongFile, "id"> {
  return {
    path: song.path,
    name: song.name,
    hash: song.hash,
    title: song.metadata?.title,
    artist: song.metadata?.artist,
    album: song.metadata?.album,
    year: song.metadata?.year,
    duration: song.metadata?.duration,
    formatType: song.format?.type,
    bitrate: typeof song.format?.bitrate === "number" ? song.format.bitrate : undefined,
    lossless: song.format?.lossless ?? false,
    sampleRate: typeof song.format?.sampleRate === "number" ? song.format.sampleRate : undefined,
  };
}

// Convert from Prisma DB model to Song (app model)
export function toSongModel(db: PrismaSongFile): Song {
  return {
    path: db.path,
    name: db.name,
    hash: db.hash,
    metadata: {
      title: db.title ?? undefined,
      artist: db.artist ?? undefined,
      album: db.album ?? undefined,
      year: db.year ?? undefined,
      duration: db.duration ?? undefined,
    },
    format: db.formatType
      ? {
        type: db.formatType,
        bitrate: db.bitrate ?? "unknown",
        lossless: db.lossless,
        sampleRate: db.sampleRate ?? "unknown",
      }
      : undefined,
  };
}

