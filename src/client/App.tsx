import React, { useState } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";
import MusicFilesTab from "./components/music-files/MusicFilesTab";
import DownloadListTab from "./components/DownloadListTab";

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth={false}>
      <Box>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Music Files" />
          <Tab label="Download List" />
        </Tabs>
        {tab === 0 && <MusicFilesTab />}
        {tab === 1 && <DownloadListTab />}
      </Box>
    </Container>
  );
}