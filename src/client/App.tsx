import React from "react";
import { useState } from "react";
import axios from "axios";

import { Box, Typography, Container, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const App = () => {
  const [state, setState] = useState<Array<any>>([]);
  const [selectedRows, setSelectedRows] = useState([]);

  React.useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        const data = res.data.map((file, index) => ({
          id: index,
          name: file.name,
          title: file.metadata?.title || "",
          artist: file.metadata?.artist || "",
          album: file.metadata?.album || "",
          duration: file.metadata?.duration?.toFixed(2) || "",
        }));
        setState(data);
      })
      .catch((err) => console.error("API error", err));
  }, []);

  const sortedRows = React.useMemo(() => {
    const counts = {};
    state.forEach((r) => {
      const key = `${r.title}-${r.artist}`;
      counts[key] = (counts[key] || 0) + 1;
    });

    return state
      .map((r) => {
        const key = `${r.title}-${r.artist}`;
        return { ...r, isDuplicate: counts[key] > 1 };
      })
      .sort((a, b) => (b.isDuplicate ? 1 : 0) - (a.isDuplicate ? 1 : 0));
  }, [state]);

  const duplicateKeys = React.useMemo(() => {
    const count = {};
    state.forEach((r) => {
      const key = `${r.title}-${r.artist}`;
      count[key] = (count[key] || 0) + 1;
    });
    return new Set(Object.keys(count).filter((key) => count[key] > 1));
  }, [state]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Filename", flex: 1 },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "artist", headerName: "Artist", flex: 1 },
    { field: "album", headerName: "Album", flex: 1 },
    { field: "duration", headerName: "Duration (s)", type: "number", width: 150 },
    {
        field: "isDuplicate",
        headerName: "Duplicate",
        width: 120,
        valueGetter: (params) => (params ? "Yes" : "No"),
        sortable: true,
        filterable: false,
    },
  ];

  const [showOnlyDuplicates, setShowOnlyDuplicates] = React.useState<boolean>(false);

  const filteredRows = React.useMemo(() => {
  if (showOnlyDuplicates) {
    return sortedRows.filter((row) => row.isDuplicate);
  }
  return sortedRows;
}, [showOnlyDuplicates, sortedRows]);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 15,
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Music Files
      </Typography>
      <Button
      variant="contained"
      sx={{ mb: 1, width: "15rem" }}
      onClick={() => setShowOnlyDuplicates((prev) => !prev)}
    >
      {showOnlyDuplicates ? "Show All" : "Show Only Duplicates"}
    </Button>
      <Box sx={{ height: "81vh" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pagination
          checkboxSelection // ✅ enables checkboxes
          getRowClassName={(params) => {
            const key = `${params.row.title}-${params.row.artist}`;
            return duplicateKeys.has(key) ? "duplicate-row" : "";
          }}
          sx={{
            "& .duplicate-row": {
              backgroundColor: "#fff3cd", // inline equivalent of soft yellow
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default App;