import { NextPage } from "next/types";
import { useAppContext } from "./_app";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useThemeChecker } from "../scripts/theme";
import { TextField } from "@mui/joy";
import { useEffect, useState } from "react";
import { queryToUrl, fetchArchive } from "../scripts/apiTools";
import Title from "../components/title/title";

import styles from '../styles/Results.module.css'
import ResultCard from "../components/resultCard/resultCard";
import Section from "../components/section";


const Results: NextPage = () => {
    const [mode, setMode] = useThemeChecker();
    const router = useRouter();
    const appContext = useAppContext();
    const [results, setResults] = useState<ArchiveResult[]>(appContext.results);

    if (results.length < 1) {
        router.push('/');
        return null;
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Section>
                    <Title />

                    <div className={styles.description}>
                        <SearchInfo results={results} setResults={setResults} />
                    </div>
                </Section>
                <Stack 
                    spacing={1}
                    sx={{
                        width: {xs: '100%', md: '80%'},
                    }}>
                    {results.map((result, i) => <ResultCard key={i} result={result} i={i} />)}
                </Stack>
            </main>

            <footer className={styles.footer}>
                <a href="//jedwards.cc" target="_blank" rel="noopener noreferrer">
                    by Justin Edwards
                </a>
            </footer>
        </div>
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
            Showing  <TextField
                variant="plain"
                value={resultsShown}
                onChange={changeMaxResults}
                sx={{
                    width: ((resultsShown.toString().length + 3) * 9) + 'px',
                    mx: 1
                }} />  {props.results.length > 1 ? 'results' : 'result'}
        </>
    )
}

export default Results;