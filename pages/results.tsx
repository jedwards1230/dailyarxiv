import { NextPage } from "next/types";
import { useAppContext } from "./_app";
import styles from '../styles/Results.module.css'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LaunchIcon from '@mui/icons-material/Launch';
import Card from '@mui/joy/Card';
import { Stack } from "@mui/material";
import Typography from '@mui/joy/Typography';
import { useRouter } from "next/router";
import { MathJax } from "better-react-mathjax";
import { useThemeChecker } from "../scripts/theme";
import IconButton from '@mui/joy/IconButton';
import { Grid, Link, TextField } from "@mui/joy";
import { useEffect, useState } from "react";
import { queryToUrl, fetchArchive } from "../scripts/apiTools";
import Title from "../components/title/title";


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
                <div className={styles.welcome}>
                    <Title />

                    <div className={styles.description}>
                        <SearchInfo results={results} setResults={setResults} />
                    </div>
                </div>
                <Stack className={styles.results} spacing={1}>
                    {results.map((result, i) => <Result key={i} result={result} i={i} />)}
                </Stack>
            </main>

            <footer className={styles.footer}>
                <a
                    href="//jedwards.cc"
                    target="_blank"
                    rel="noopener noreferrer"
                >
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

const Result = (props: { result: ArchiveResult, i: number }) => {
    const [open, setOpen] = useState(false);

    return (
        <Card
            sx={{
                py: 1,
                borderRadius: '0.5rem',
                '&:hover, &:focus-within': {
                    bgcolor: 'background.level1',
                },
            }}>
            <Link
                overlay
                onClick={() => setOpen(!open)}>
                <Typography sx={{ fontSize: 20 }} level="h6">
                    {ParseTex(props.result.title)}
                </Typography>
            </Link>
            <Grid container>
                <Grid xs={11}>
                    <Typography sx={{ mb: 1, width: "90%", fontSize: 15 }} textColor="text.secondary">
                        {props.result.author.map((author, i: number) => (i === props.result.author.length - 1) ? author : author + ', ')}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
                        {props.result.primaryCategory}
                    </Typography>
                </Grid>
                <Grid xs={1}>
                    <IconButton
                        variant="plain"
                        component='a'
                        href={props.result.id}
                        target="_blank"
                        rel="noopener noreferrer">
                        <LaunchIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {open &&
                <Typography sx={{ fontSize: 14, pb: 2, pt: 1 }} >{ParseTex(props.result.summary)}</Typography>}
        </Card>
    )
}

/** Scan through the title string to $[content]$ with <MathJax>[content]</MathJax>  */
function ParseTex(dirtyStr: string): any {
    const res: JSX.Element[] = [];
    for (let i = 0; i < dirtyStr.length; i++) {
        if (dirtyStr[i] === '$') {
            let j = i + 1;
            while (dirtyStr[j] !== '$') j++;
            res.push(<Typography sx={{ fontStyle: 'strong' }}><MathJax inline={true} >{dirtyStr.substring(i + 1, j)}</MathJax></Typography>);
            i = j;
        } else {
            res.push(<span>{dirtyStr[i]}</span>);
        }
    }
    // return every item in res as one 
    return res.map((item, index) => {
        return <>{item}</>;
    }).reduce((prev, curr) => {
        return <>{prev}{curr}</>;
    }).props.children;
}

export default Results;