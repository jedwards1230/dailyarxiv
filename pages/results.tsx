import { NextPage } from "next/types";
import { useAppContext } from "./_app";
import styles from '../styles/Results.module.css'
import Head from 'next/head'
import { Card, CardActions, CardContent, Link as MUILink, Stack, Typography } from "@mui/material";
import Link from 'next/link'
import {useRouter} from "next/router";


const Results: NextPage = () => {
    const router = useRouter();
    const appContext = useAppContext();

    if (appContext.results.length < 1) {
        router.push('/');
        return null;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Daily Arxiv</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.welcome}>
                    <h1 className={styles.title}>
                        Daily <Link href="/">arXiv</Link>
                    </h1>

                    <p className={styles.description}>
                        Results
                    </p>
                </div>
                <Stack className={styles.results} spacing={2}>
                    {appContext.results.map((result, i) => {
                        //console.log(result)
                        return (
                            <div key={result.id + i}>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                                            {result.title}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {'Authors: ' + result.author.map((author: { name: string }, i: number) => {
                                                return (i === result.author.length - 1) ? author.name : author.name + ' '
                                            })}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Category
                                        </Typography>
                                        <MUILink
                                            sx={{ ml: 'auto' }}
                                            href={result.id}
                                            target="_blank"
                                            rel="noopener noreferrer">Open</MUILink>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })}
                </Stack>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    by Justin Edwards
                </a>
            </footer>
        </div>
    )
}

export default Results;