import { createTheme, PaletteMode } from "@mui/material";

export const buildTheme = (theme: PaletteMode) => createTheme({
    palette: {
        mode: theme,
        ...(theme === 'light'
            ? {
            }
            : {
            }),
    },
})