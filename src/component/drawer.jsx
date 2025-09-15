import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import YoutubePlayer from "./youtubePlayer";

export default function TemporaryDrawer({
  open,
  onClose,
  primaryItems = [],
  width = 300,
  videoId,
  onReady,
}) {
  const DrawerList = (items) => (
    <Box sx={{ width: "100%" }} role="presentation">
      <List>
        {items.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  color: "white", // text color
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "white", // text color
                }}
                primary={text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <p className="text-white text-center p-4">{lyrics}</p> */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <YoutubePlayer
          videoId={videoId}
          opts={{ playerVars: { autoplay: 1 } }}
          onReady={onReady}
        />
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgb(0, 0, 0)", // change to any color
          },
        }}
        keepMounted
        open={open}
        onClose={onClose} // <- call Canvas handler
      >
        <Box sx={{ width }} role="presentation">
          {DrawerList(primaryItems)}
        </Box>
      </Drawer>
    </div>
  );
}
