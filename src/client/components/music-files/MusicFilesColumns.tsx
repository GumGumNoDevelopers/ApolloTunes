import { GridColDef } from "@mui/x-data-grid";

export const COLUMNS: GridColDef[] = [
  { field: "title", headerName: "Title", flex: 2 },
  { field: "name", headerName: "Filename", flex: 1 },
  { field: "path", headerName: "Path", flex: 2.5 },
  { field: "hash", headerName: "Hash", flex: 1 },
  { field: "artist", headerName: "Artist", flex: 1 },
  { field: "album", headerName: "Album", flex: 1 },
  { field: "year", headerName: "Year", width: 90 },
  { field: "duration", headerName: "Duration (s)", type: "number", width: 130 },
  { field: "formatType", headerName: "Format Type", flex: 0.5 },
  { field: "bitrate", headerName: "Bitrate", width: 110 },
  { field: "lossless", headerName: "Lossless", width: 100 },
  { field: "sampleRate", headerName: "Sample Rate", width: 120 },
  { field: "isDuplicate", headerName: "Duplicate", width: 120 },
];

export const COLUMN_VISIBILITY = {
  name: false,
  hash: false,
  year: false,
  bitrate: false,
  sampleRate: false,
  lossless: false,
}