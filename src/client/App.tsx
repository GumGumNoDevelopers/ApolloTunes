import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import MusicFilesTab from "./components/MusicFilesTab";
import DownloadListTab from "./components/DownloadListTab";

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Music Files" />
        <Tab label="Download List" />
      </Tabs>
      {tab === 0 && <MusicFilesTab />}
      {tab === 1 && <DownloadListTab />}
    </Box>
  );
}