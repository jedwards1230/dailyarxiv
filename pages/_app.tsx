import '../styles/globals.css'
import "../styles/calendar.css";
import type { AppProps } from 'next/app'
import { CssBaseline, NoSsr } from '@mui/material';
import { createContext, useContext } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { CssVarsProvider } from '@mui/joy/styles';
import theme from '../scripts/theme';
import Layout from '../components/layout';

// store categories, date in localstorage
const saveConfig = (categories: ArchiveHeader[], datepicker: Date) => {
	const config: CategoryForm = {
		categories,
		datepicker
	}
	localStorage.setItem('config', JSON.stringify(config));
}

const loadConfig = (): CategoryForm | null => {
	const stored = localStorage.getItem('config');
	if (stored) {
		const config = JSON.parse(stored);
		config.datepicker = new Date(config.datepicker);
		return config
	}
	return null;
}

const AppContext = createContext({
	results: new Array<ArchiveResult>(),
	query: '',
	timePicked: new Date(),
	saveConfig,
	loadConfig,
});

function MyApp({ Component, pageProps }: AppProps) {
	const sharedState = useContext(AppContext);

	return (
		<AppContext.Provider value={sharedState}>
			<CssVarsProvider defaultMode="system" theme={theme}>
				<MathJaxContext>
					<NoSsr>
						<Layout>
							<CssBaseline />
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
