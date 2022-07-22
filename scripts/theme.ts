import { createTheme, PaletteMode } from "@mui/material";
import { amber, grey, deepOrange, blue } from "@mui/material/colors";

export const buildTheme = (theme: PaletteMode) => createTheme({
    palette: {
        mode: theme,
        ...(theme === 'light'
            ? {
            }
            : {
            }),
    },
    components: {
        MuiUseMediaQuery: {
            defaultProps: {
                noSsr: true,
            },
        },
        // todo: add dark theme for calendar
        /* \MuiCssBaseline: {
            styleOverrides: (themeParam) => `
                .react-calendar {
                    background: ${themeParam.palette.grey[50]};
                }
                .react-calendar__tile:disabled {
                    background-color: ${themeParam.palette.grey[500]};
                  }
              `,
        }, */
    },
})