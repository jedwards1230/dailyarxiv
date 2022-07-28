import { NextPage } from "next/types";
import { useAppContext } from "./_app";
import styles from '../styles/Results.module.css'
import { Grid, Stack } from "@mui/material";
import Typography from '@mui/joy/Typography';
import Link from 'next/link'
import { useRouter } from "next/router";
import { MathJax } from "better-react-mathjax";
import { useThemeChecker } from "../scripts/theme";


const Results: NextPage = () => {
	const [mode, setMode] = useThemeChecker();
    const router = useRouter();
    const appContext = useAppContext();

    if (appContext.results.length < 1) {
        router.push('/');
        return null;
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.welcome}>
                    <h1 className={styles.title}>
                        daily <Link href="/">arXiv</Link>
                    </h1>

                    <div className={styles.description}>
                        <SearchInfo results={appContext.results} />
                    </div>
                </div>
                <Stack className={styles.results} spacing={3}>
                    {appContext.results.map((result: ArchiveResult, i: number) => {
                        return (
                            <a
                                key={i}
                                href={result.id}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Result result={result} i={i} />
                            </a>
                        )
                    })}
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

const SearchInfo = (props: { results: ArchiveResult[] }) => {
    return (
        <p >
            showing {props.results.length} {props.results.length > 1 ? 'results' : 'result'}
        </p>
    )
}

const Result = (props: { result: ArchiveResult, i: number }) => {
    return (
        <Grid
            key={props.result.id + props.i}
            container
            direction='row'
            justifyContent="center"
            alignItems="center">
            <Grid item xs={12}>
                <Typography sx={{ fontSize: 20 }} level="h6">
                    <Title title={props.result.title} />
                </Typography>
                <Typography sx={{ mb: 1, width: "90%", fontSize: 15 }} color="neutral">
                    {props.result.author.map((author, i: number) => (i === props.result.author.length - 1) ? author : author + ', ')}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
                    {props.result.primaryCategory}
                </Typography>
            </Grid>
        </Grid>
    )
}

const Title = (props: { title: string }) => {
    /** Scan through the title string to $[content]$ with <MathJax>[content]</MathJax>  */
    const buildTitle = (title: string): any => {
        const res: JSX.Element[] = [];
        for (let i = 0; i < title.length; i++) {
            if (title[i] === '$') {
                let j = i + 1;
                while (title[j] !== '$') j++;
                res.push(<Typography sx={{ fontStyle: 'strong' }}><MathJax inline={true} >{title.substring(i + 1, j)}</MathJax></Typography>);
                i = j;
            } else {
                res.push(<span>{title[i]}</span>);
            }
        }
        // return every item in res as one 
        return res.map((item, index) => {
            return <>{item}</>;
        }).reduce((prev, curr) => {
            return <>{prev}{curr}</>;
        }).props.children;
    }

    return (
        <div onClick={() => console.log(props.title)}>
            {buildTitle(props.title)}
        </div>
    )
}

export default Results;