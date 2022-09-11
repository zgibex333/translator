import { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ColorModeContext } from "../context/context";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

type ColorMode = "light" | "dark";
type Props = {
  children?: React.ReactNode;
};

export const ContextWrapper: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<ColorMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  console.log(colorMode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
