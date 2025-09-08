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

export default function TemporaryDrawer({
  open,
  onClose,
  primaryItems = [],
  width = 300,
  lyrics,
}) {
  const DrawerList = (items) => (
    <Box sx={{ width: 300 }} role="presentation">
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
      <p className="text-white text-center p-4">{lyrics}</p>
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
        open={open}
        onClose={onClose}
      >
        <Box sx={{ width }} role="presentation" onClick={onClose}>
          {DrawerList(primaryItems)}
        </Box>
      </Drawer>
    </div>
  );
}
