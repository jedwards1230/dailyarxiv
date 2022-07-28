import '../styles/globals.css'
import "../styles/calendar.css";
import type { AppProps } from 'next/app'
import { CssBaseline, NoSsr } from '@mui/material';
import { createContext, useContext } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { CssVarsProvider, getInitColorSchemeScript, useColorScheme } from '@mui/joy/styles';
import theme from '../scripts/theme';


const AppContext = createContext({
	results: new Array<ArchiveResult>(),
	query: '',
	timePicked: new Date(),
});

function MyApp({ Component, pageProps }: AppProps) {
	//const { mode, setMode } = useColorScheme();
	const sharedState = useContext(AppContext);

	return (
		<AppContext.Provider value={sharedState}>
			<CssVarsProvider theme={theme}>
				<MathJaxContext>
					<NoSsr>
						{getInitColorSchemeScript()}
						<CssBaseline />
						<Component {...pageProps} />
					</NoSsr>
				</MathJaxContext>
			</CssVarsProvider>
		</AppContext.Provider>
	)
}

export function useAppContext() {
	return useContext(AppContext);
}

export default MyApp
