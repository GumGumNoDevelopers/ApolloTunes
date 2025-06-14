import { SongFile } from "@prisma/client";

export function getFileTypes(rows: any[]): string[] {
  const types = new Set<string>();
  rows.forEach((row) => {
    const ext = row.name?.substring(row.name.lastIndexOf(".")).toLowerCase();
    if (ext) types.add(ext);
  });
  return ["", ...Array.from(types).sort()];
}

export function filterByFileType(rows: any[], fileType: string): any[] {
  if (!fileType) return rows;
  return rows.filter((row) => row.name?.toLowerCase().endsWith(fileType));
}

export function filterDuplicates(rows: any[]): any[] {
  return rows.filter((row) => row.isDuplicate);
}

export function parseResponse(data: SongFile) {
  return {
    id: data.id,
    path: data.path,
    name: data.name,
    hash: data.hash,
    title: data?.title || "",
    artist: data?.artist || "",
    album: data?.album || "",
    year: data?.year ?? "",
    duration: data.duration !== undefined && data.duration !== null ? data.duration.toFixed(2) : "",
    formatType: data?.formatType || "",
    bitrate: data.bitrate ?? "",
    lossless: data.lossless ? "Yes" : "No",
    sampleRate: data.sampleRate ?? "",
    isDuplicate: data.isDuplicate || false,
  }
}