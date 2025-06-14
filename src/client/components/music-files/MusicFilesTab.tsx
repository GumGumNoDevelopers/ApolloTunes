import React from "react";
import axios from "axios";
import { Box, Typography, Button, FormControlLabel, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { SongFile } from "@prisma/client";
import { COLUMN_VISIBILITY, COLUMNS } from "./MusicFilesColumns";
import { MusicFilesFilter } from "./MusicFilesFilter";
import { getFileTypes, filterByFileType, filterDuplicates, parseResponse } from "./util";

const MusicFilesTab: React.FC = () => {
  const [state, setState] = React.useState<Array<any>>([]);
  const [fileType, setFileType] = React.useState<string>("");
  const [showOnlyDuplicates, setShowOnlyDuplicates] = React.useState<boolean>(false);

  React.useEffect(() => {
    axios
      .get("/api/songs")
      .then((res) => setState(res.data.map((data: SongFile) => parseResponse(data))))
      .catch((err) => console.error("API error", err));
  }, []);

  const fileTypes = React.useMemo(() => getFileTypes(state), [state]);

  const filteredRows = React.useMemo(() => {
    let rows = [...state];
    if (showOnlyDuplicates) rows = filterDuplicates(rows);
    if (fileType) rows = filterByFileType(rows, fileType);
    return rows;
  }, [state, showOnlyDuplicates, fileType]);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 15,
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Music Files
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showOnlyDuplicates}
              onChange={() => setShowOnlyDuplicates((prev) => !prev)}
              color="primary"
            />
          }
          label="Show Only Duplicates"
        />
        <MusicFilesFilter fileTypes={fileTypes} value={fileType} onChange={setFileType} />
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