import Head from 'next/head'

export default function Layout(props: { children: any }) {
    return (
        <>
            <Head>
                <title>Daily Arxiv</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {props.children}
        </>
    )
}