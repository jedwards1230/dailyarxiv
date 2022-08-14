import { NextPage } from "next/types";
import { useAppContext } from "./_app";
import { useRouter } from "next/router";
import { useThemeChecker } from "../scripts/theme";
import { TextField } from "@mui/joy";
import { useState } from "react";
import { queryToUrl, fetchArchive } from "../scripts/apiTools";
import Title from "../components/title/title";
import styles from '../styles/Results.module.css'
import ResultCard from "../components/resultCard/resultCard";


const Results: NextPage = () => {
    const [mode, setMode] = useThemeChecker();
    const router = useRouter();
    const appContext = useAppContext();
    const [results, setResults] = useState<ArchiveResult[]>(appContext.results);

    if (!results || results.length < 1) {
        router.push('/');
        return null;
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.section}>
                    <Title />

                    <div className={styles.description}>
                        <SearchInfo results={results} setResults={setResults} />
                    </div>
                </div>
                <div className={styles.resultList}>
                    {results.map((result, i) => <ResultCard key={i} result={result} i={i} />)}
                </div>
            </main>

            <footer className={styles.footer}>
                <a href="//jedwards.cc" target="_blank" rel="noopener noreferrer">
                    by Justin Edwards
                </a>
            </footer>
        </>
    )
}

const SearchInfo = (props: {
    results: ArchiveResult[],
    setResults: (results: ArchiveResult[]) => void
}) => {
    const appContext = useAppContext();
    const [resultsShown, setResultsShown] = useState<string>(props.results.length.toString());

    const changeMaxResults = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || !isNaN(Number(value))) {
            setResultsShown(value);
            if (value !== '') {
                const url = queryToUrl(appContext.query, appContext.timePicked, Number(value));
                const response = await fetchArchive(url);
                appContext.results = response as ArchiveResult[];
                props.setResults(response as ArchiveResult[]);
            }
        }
    }

    return (
        <>
            <p className={styles.datePicked}>
                {appContext.timePicked.toDateString()}
            </p>
            <p className={styles.resultCount}>
                Showing
                <TextField
                    variant="plain"
                    value={resultsShown}
                    onChange={changeMaxResults}
                    sx={{
                        display: 'inline-flex',
                        width: ((resultsShown.toString().length + 3) * 9),
                        mx: 0.5,
                    }} />
                {props.results.length > 1 ? 'results' : 'result'}
            </p>
        </>
    )
}

export default Results;