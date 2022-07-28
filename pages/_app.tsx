import '../styles/globals.css'
import "../styles/calendar.css";
import type { AppProps } from 'next/app'
import { NoSsr } from '@mui/material';
import { createContext, useContext } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { CssVarsProvider } from '@mui/joy/styles';
import theme from '../scripts/theme';
import Layout from '../components/layout';


const AppContext = createContext({
	results: new Array<ArchiveResult>(),
	query: '',
	timePicked: new Date(),
});

function MyApp({ Component, pageProps }: AppProps) {
	const sharedState = useContext(AppContext);

	return (
		<AppContext.Provider value={sharedState}>
			<CssVarsProvider defaultMode="system" theme={theme}>
				<MathJaxContext>
					<NoSsr>
						<Layout>
							<Component {...pageProps} />
						</Layout>
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
