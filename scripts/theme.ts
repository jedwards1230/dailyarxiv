import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import { extendTheme as extendJoyTheme, useColorScheme } from '@mui/joy/styles';
import colors from '@mui/joy/colors';
import { deepmerge } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';

export const useThemeChecker = () => {
    const { mode, setMode } = useColorScheme();
	const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	useEffect(() => {
		setMode(isDarkMode ? 'dark' : 'light');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDarkMode]);

    return [mode, setMode];
}

const muiTheme = extendMuiTheme({
    // This is required to point to `var(--joy-*)` because we are using `CssVarsProvider` from Joy UI.
    cssVarPrefix: 'joy',
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: colors.blue[500],
                },
                grey: colors.grey,
                error: {
                    main: colors.red[500],
                },
                info: {
                    main: colors.purple[500],
                },
                success: {
                    main: colors.green[500],
                },
                warning: {
                    main: colors.yellow[200],
                },
                common: {
                    white: '#FFF',
                    black: '#09090D',
                },
                divider: colors.grey[200],
                text: {
                    primary: colors.grey[800],
                    secondary: colors.grey[600],
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: colors.blue[600],
                },
                grey: colors.grey,
                error: {
                    main: colors.red[600],
                },
                info: {
                    main: colors.purple[600],
                },
                success: {
                    main: colors.green[600],
                },
                warning: {
                    main: colors.yellow[300],
                },
                common: {
                    white: '#FFF',
                    black: '#09090D',
                },
                divider: colors.grey[800],
                text: {
                    primary: colors.grey[100],
                    secondary: colors.grey[300],
                },
            },
        },
    },
});

const joyTheme = extendJoyTheme();

const theme = deepmerge(muiTheme, joyTheme);

export default theme;