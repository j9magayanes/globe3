import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Typography, BottomNavigation, BottomNavigationAction } from "@mui/material";
import BasicCard from "../card";




export default function Bottom() {
  const [value, setValue] = useState("Map");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  return (
    <BottomNavigation
      showLabels
      value={1}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Newsfeed"  onClick={() => setIsDrawerOpen(true)} />
      <BottomNavigationAction label="Map" />
      <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <Box p={2} width="350px" textAlign='center' role='presentation'>
        <Typography variant='h6' component='div'>
        {/* <p>{category  ? "AVERAGE DATA ON " + category.toUpperCase() : "NO DATA AVAILABLE"}</p> */} 
        </Typography>
        <BasicCard/>
      </Box>
    </Drawer>
    </BottomNavigation>
  )
}
