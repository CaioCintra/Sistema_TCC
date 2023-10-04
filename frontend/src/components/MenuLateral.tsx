"use client";

import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import CoPresentRoundedIcon from "@mui/icons-material/CoPresentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const drawerWidth: number = 280;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "var(--primary-color)",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "var(--secondary-color)",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(8),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function MenuLateral(props: any) {
  const [open, setOpen] = React.useState(true);

  const handleLogout = () => {
    document.cookie = "TCC.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/* Título do cabeçalho */}
            </Typography>
            <IconButton onClick={handleLogout} className="text-white">
              <ExitToAppRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>



          </Toolbar>

          <Divider />

          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "var(--secondary-color)",
            }}
          >
            <ListItemButton className="h-16">
              <ListItemIcon>
                <BarChartRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <Divider />
          </Box>
          <text className="pt-4 text-xl font-bold text-center justify-center align-middle text-[#4F4F4F]">
            TCC1
          </text>
          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "var(--secondary-color)",
            }}
          >
            <List component="nav" aria-label="main mailbox folders">
              <a href="/TCC1/matricular">
                <ListItemButton className="h-16">
                  <ListItemIcon>
                    <PersonAddRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Matrícula" />
                </ListItemButton>
                <Divider />
              </a>
              <a href="/TCC1/definirOrientador">
                <ListItemButton className="h-16">
                  <ListItemIcon>
                    <SupervisorAccountRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orientador" />
                </ListItemButton>
                <Divider />
              </a>
              <a href="/TCC1/agendarBanca">
                <ListItemButton className="h-16">
                  <ListItemIcon>
                    <InsertInvitationRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Agendar Banca" />
                </ListItemButton>
                <Divider />
              </a>
              <a href="/TCC1/defesa">
                <ListItemButton className="h-16">
                  <ListItemIcon>
                    <CoPresentRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Defesa" />
                </ListItemButton>
                <Divider />
              </a>
            </List>
          </Box>
          <text className="pt-10 text-xl leading-7 font-bold text-center justify-center align-middle text-[#4F4F4F]">
            TCC2
          </text>
          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "var(--secondary-color)",
            }}
          >
            <List component="nav" aria-label="main mailbox folders">
              <a href="/TCC2/matricular">
                <ListItemButton className="h-16">
                  <ListItemIcon>
                    <PersonAddRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Matrícula" />
                </ListItemButton>
                <Divider />
              </a>
              <a href="/TCC2/definirOrientador">
                <ListItemButton className="h-16">
                  <ListItemIcon>
                    <SupervisorAccountRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orientador" />
                </ListItemButton>
                <Divider />
              </a>
              <a href="/TCC2/agendarBanca">
                <ListItemButton className="h-16">
                  <ListItemIcon>
                    <InsertInvitationRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Agendar Banca" />
                </ListItemButton>
                <Divider />
              </a>
              <a href="/TCC2/defesa">
                <ListItemButton className="h-16">
                  <ListItemIcon>
                    <CoPresentRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Defesa" />
                </ListItemButton>
                <Divider />
              </a>
            </List>
          </Box>
          <text className="pt-6 pb-4 text-xl font-bold text-center justify-center align-middle text-[#4F4F4F]">
            ADM
          </text>
          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "var(--secondary-color)",
            }}
            className="inset-x-0 bottom-0"
          >
            <Divider />
            <a href="/admin/menu">
              <ListItemButton className="h-16">
                <ListItemIcon>
                  <SettingsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </ListItemButton>
              <Divider />
            </a>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "var(--background-color)"
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {/* Div principal */}
          <div className="m-10">{props.children}</div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
