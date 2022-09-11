import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RttIcon from "@mui/icons-material/Rtt";
import { useTheme } from "@mui/material";
import { ColorModeContext } from "../context/context";
import { FAVOURITES, HISTORY, HOME } from "../utils/routes";

const pages: [string, React.ReactNode, string][] = [
  ["Translate", <RttIcon />, HOME],
  ["Favourites", <FavoriteBorderIcon />, FAVOURITES],
  ["History", <HistoryEduIcon />, HISTORY as string],
];

export const Header: React.FC = () => {
  const { toggleColorMode } = useContext(ColorModeContext);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const theme = useTheme();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path: string) => {
    setAnchorElNav(null);
    navigate(path);
  };

  const currentColorModeIcon =
    theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="current-menu-list"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleCloseNavMenu(page[2])}
                >
                  {page[1]}
                  <Typography textAlign="center">{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleCloseNavMenu(page[2])}
                sx={{ my: 2, mr: 2, color: "white", display: "flex" }}
                endIcon={page[1]}
                variant={pathname === page[2] ? "contained" : "text"}
              >
                {page[0]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton aria-label="delete" onClick={toggleColorMode}>
              {currentColorModeIcon}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
