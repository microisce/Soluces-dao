import CssBaseline from "@mui/material/CssBaseline";
import { SideBar, links } from "../../components/SideBar";
import Content from "../../components/Content";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useDashboardStore from "../../store/useDataStore";
import { getUser } from "../../api/Loaders";
import { IUser } from "../../types/types";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/Topbar";
import { useAuthState } from "../../store/auth_store";
import React from "react";
import { Toolbar, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Drawer, IconButton, AppBar } from "@mui/material";
import { Divider, List } from "antd";
import { Inbox, Mail, Menu as MenuIcon } from "@mui/icons-material";
import SDLogo from "../../assets/SD-LOGO.png";



const drawerWidth = 300;

const DrawerMenu =  () => {

  const navigate = useNavigate()
 
 return (<div>
    <Toolbar >
    <img
      src={SDLogo}
      alt="main_logo"
      width={200}
      height={50}
      style={{ marginTop: 10 }}
    />
    </Toolbar>
    <Divider />
    <List>
      {links.map((item, index) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton onClick={()=>navigate(item.path)}>
            <ListItemIcon>
             {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    {/* <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List> */}
  </div>
);
}


function Home() {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
 
  const {is_authenticated, user} = useAuthState()
  
  const navigate = useNavigate();




  useEffect(() => {
    if (!is_authenticated) {
      navigate("/");
    }
  }, [navigate, is_authenticated]);

  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open DrawerMenu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive DrawerMenu
          </Typography> */}
          <TopBar />
          
        </Toolbar>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          //container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerMenu />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerMenu />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Content />
      </Box>
    </Box>
  );
    // <div style={{ position: "relative" }}>
    //   <CssBaseline />
    //   <TopBar  />
    //   <Box
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "flex-start",
    //       flexDirection: "row",
    //       position: "relative",
    //     }}
    //   >
    //     <SideBar />
    //     <Content />
    //   </Box>
    // </div>
  
}

export default Home;
