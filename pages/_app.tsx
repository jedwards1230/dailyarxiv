import '../styles/globals.css'
import "../styles/calendar.css";
import type { AppProps } from 'next/app'
import { CssBaseline, NoSsr, PaletteMode, ThemeProvider, useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState, createContext, useContext } from 'react';
import createEmotionCache from '../scripts/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { buildTheme } from '../scripts/theme';
//import Script from 'next/script';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

const AppContext = createContext({
	results: new Array<ArchiveResult>()
});

function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const prefersDarkMode = useMediaQuery<boolean>('(prefers-color-scheme: dark', { noSsr: true });
	const [mode, setMode] = useState<PaletteMode>('dark');
	let sharedState = useContext(AppContext);

	useEffect(() => {
		setMode(prefersDarkMode ? 'dark' : 'light');
	}, [mode, prefersDarkMode]);

	const theme = useMemo(() => {
		return buildTheme(mode);
	}, [mode]);

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<AppContext.Provider value={sharedState}>
					<NoSsr>
						<CssBaseline />
						{/* <Script src="/theme.js" strategy="beforeInteractive" /> */}
						<Component {...pageProps} />
					</NoSsr>
				</AppContext.Provider>
			</ThemeProvider>
		</CacheProvider>
	)
}

/** Used to fade between page changes */
function TransitionLayout(props: {
	children: React.ReactNode;
}) {
	const [displayChildren, setDisplayChildren] = useState(props.children);
	const [transitionStage, setTransitionStage] = useState("fadeOut");

	useEffect(() => {
		setTransitionStage("fadeIn");
	}, []);

	useEffect(() => {
		if (props.children !== displayChildren) setTransitionStage("fadeOut");
	}, [props.children, setDisplayChildren, displayChildren]);

	return (
		<div
			onTransitionEnd={() => {
				if (transitionStage === "fadeOut") {
					setDisplayChildren(props.children);
					setTransitionStage("fadeIn");
				}
			}}
			className={"content " + transitionStage}
		>
			{displayChildren}
		</div>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}

export default MyApp
