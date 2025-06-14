import React from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { SongFile } from "@prisma/client";
import { COLUMN_VISIBILITY, COLUMNS } from "./MusicFilesColumns";
import { MusicFilesFilter } from "./MusicFilesFilter";
import { DuplicateFilterOption, DuplicateFilterSelect } from "./DuplicateFiterSelect";
import { getFileTypes, filterByFileType, parseResponse } from "./util";

const MusicFilesTab: React.FC = () => {
  const [state, setState] = React.useState<Array<SongFile>>([]);
  const [fileType, setFileType] = React.useState<string>("");
  const [duplicateFilter, setDuplicateFilter] = React.useState<DuplicateFilterOption>("all");
  const [forceRefresh, setForceRefresh] = React.useState(null);

  const fetchSongs = React.useCallback(() => {
    setForceRefresh(true);
    axios
      .get("/api/songs")
      .then((res) => setState(res.data.map((data: SongFile) => parseResponse(data))))
      .catch((err) => console.error("API error", err))
      .finally(() => setForceRefresh(false));
  }, []);

  const handleForceRefresh = () => {
    setForceRefresh(true);
    axios
      .get("/api/rescan")
      .then(() => console.log("Rescan completed successfully"))
      .catch((err) => console.error("Rescan failed", err))
      .finally(fetchSongs);
  };

  React.useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const fileTypes = React.useMemo(() => getFileTypes(state), [state]);

  const filteredRows = React.useMemo(() => {
    let rows = [...state];
    if (duplicateFilter === "only") {
      rows = rows.filter((row) => row.isDuplicate);
    } else if (duplicateFilter === "none") {
      rows = rows.filter((row) => !row.isDuplicate);
    }
    if (fileType) rows = filterByFileType(rows, fileType);
    return rows;
  }, [state, duplicateFilter, fileType]);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 15,
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Music Files
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <DuplicateFilterSelect value={duplicateFilter} onChange={setDuplicateFilter} />
        <MusicFilesFilter fileTypes={fileTypes} value={fileType} onChange={setFileType} />
        <Box sx={{ flex: 1 }} />
        <Button
          variant="outlined"
          onClick={handleForceRefresh}
          disabled={forceRefresh}
          sx={{ whiteSpace: "nowrap" }}
        >
          Rescan
        </Button>
      </Box>
      <Box>
        <DataGrid
          columnVisibilityModel={COLUMN_VISIBILITY}
          rows={filteredRows}
          columns={COLUMNS}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pagination
          checkboxSelection
          getRowClassName={(params) => params.row.isDuplicate ? "duplicate-row" : ""}
          sx={{
            "& .duplicate-row": {
              backgroundColor: "#fff3cd",
            },
          }}
        />
      </Box>
    </>
  );
};

export default MusicFilesTab;