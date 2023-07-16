import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ItemMenu from "./ItemMenu";

function changePage(){

}

export default function SelectedListItem() {
  return (
    <>
      <Box
        sx={{ width: "100%", maxWidth: 360, bgcolor: "var(--secondary-color)" }}
      >
        <ItemMenu titulo="Dashboard" />
      </Box>
      <text className="pt-4 text-2xl font-bold text-center justify-center align-middle">
        TCC1
      </text>
      <Box
        sx={{ width: "100%", maxWidth: 360, bgcolor: "var(--secondary-color)" }}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ItemMenu titulo="Matrícula" onClick={changePage()} />
          <ItemMenu titulo="Orientador" />
          <ItemMenu titulo="Banca" />
          <ItemMenu titulo="Defesa" />
        </List>
      </Box>
      <text className="pt-20 text-2xl font-bold text-center justify-center align-middle">
        TCC2
      </text>
      <Box
        sx={{ width: "100%", maxWidth: 360, bgcolor: "var(--secondary-color)" }}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ItemMenu titulo="Matrícula" />
          <ItemMenu titulo="Orientador" />
          <ItemMenu titulo="Banca" />
          <ItemMenu titulo="Defesa" />
        </List>
      </Box>
      <text className="pt-6 pb-4 text-2xl font-bold text-center justify-center align-middle">
        ADM
      </text>
      <Box
        sx={{ width: "100%", maxWidth: 360, bgcolor: "var(--secondary-color)" }}
        className="inset-x-0 bottom-0"
      >
        <Divider />
        <ItemMenu titulo="Configurações" />
      </Box>
    </>
  );
}
