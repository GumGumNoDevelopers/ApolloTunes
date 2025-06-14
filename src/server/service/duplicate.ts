import { SongFileInput } from "../routes/api";

/**
 * Marks duplicate songs in the list by adding a `duplicate: true` field.
 * First checks duplicates by hash, then by title and artist (case-insensitive).
 */
export function markDuplicates(songs: SongFileInput[]): SongFileInput[] {
  const hashCount = new Map<string, number>();
  const keyCount = new Map<string, number>();

  // First pass: count occurrences by hash and by title|artist
  for (const song of songs) {
    hashCount.set(song.hash, (hashCount.get(song.hash) || 0) + 1);

    const key = `${(song.title || "").toLowerCase()}|${(song.artist || "").toLowerCase()}`;
    keyCount.set(key, (keyCount.get(key) || 0) + 1);
  }

  // Second pass: mark duplicates
  return songs.map(song => {
    const isHashDuplicate = hashCount.get(song.hash)! > 1;
    const key = `${(song.title || "").toLowerCase()}|${(song.artist || "").toLowerCase()}`;
    const isKeyDuplicate = keyCount.get(key)! > 1;

    if (isHashDuplicate || isKeyDuplicate) {
      return { ...song, isDuplicate: true };
    }
    return { ...song, isDuplicate: false };
  });
}