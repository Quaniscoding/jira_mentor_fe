import { useEffect, useState } from "react";
import { useColorScheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { getStringLocal } from "../../utils/config.js";

export default function ColorModeSelect(props) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = getStringLocal("mui-mode");
    if (storedTheme) {
      setMode(storedTheme === "light" ? "light" : "dark");
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: system)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
    setMounted(true);
  }, [setMode]);

  if (!mode) {
    return null;
  }

  return (
    <IconButton
      {...other}
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        if (onClick) {
          onClick(event);
        }
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
