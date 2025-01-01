import { GlobalStyles, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { toggleSidebar } from "../utils/utils";

export default function Header() {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "52px",
        zIndex: 9998,
        p: 2,
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow: 1,
        backgroundColor: "background.default",
      }}
    >
      <GlobalStyles
        styles={theme => ({
          ":root": {
            "--Header-height": "52px",
            [theme.breakpoints.up("md")]: {
              "--Header-height": "0px",
            },
          },
        })}
      />
      <IconButton onClick={() => toggleSidebar()} color='default' size='small'>
        <MenuIcon />
      </IconButton>
    </Box>
  );
}
