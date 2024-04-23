import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import ReportIcon from "@mui/icons-material/Report";
import { useNavigate } from "react-router-dom";

export default function Sidemenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const handleClose = () => {
    toggleDrawer(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  const listOptions = () => (
    <Box
      role="presentation"
      onClick={handleClose}
    >
      <List>
        <ListItemButton onClick={() => handleNavigation("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/vehicles")}>
          <ListItemIcon>
            <DirectionsCarIcon />
          </ListItemIcon>
          <ListItemText primary="Vehicles" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/repairs")}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Repairs" />
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton onClick={() => handleNavigation("/reports/repair-costs")}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Repair Cost Report" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("reports/repair-type-summary")}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Repair Type Summary Report" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("reports/average-repair-time")}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Average Repair Time Report" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("reports/repair-types-engine-summary")}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Repair Type Motor Report" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
    >
      {listOptions()}
    </Drawer>
  );
}
