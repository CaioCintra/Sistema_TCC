import { ListItemButton, ListItemIcon } from "@mui/material";
import * as React from "react";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";

export default function ItemMenu(props: any) {
  return (
    <>
      <ListItemButton className="h-16">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={props.titulo} />
      </ListItemButton>
      <Divider />
    </>
  );
}
