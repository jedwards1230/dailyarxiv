import { Grid } from "@mui/joy";
import { useState } from "react";
import LaunchIcon from '@mui/icons-material/Launch';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ParseTex from "../../scripts/texParser";
import { useThemeChecker } from "../../scripts/theme";
import styles from './ResultCard.module.css';


const ResultCard = (props: { result: ArchiveResult, i: number }) => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useThemeChecker();

    return (
        <div className={styles.card}>
            <p
                className={styles.title}
                onClick={() => setOpen(!open)}>
                {ParseTex(props.result.title)}
            </p>
            <Grid container>
                <Grid xs={10}>
                    <p className={styles.authors}>
                        {props.result.author.map((author, i: number) => (i === props.result.author.length - 1) ? author : author + ', ')}
                    </p>
                    <p className={styles.category}>
                        {props.result.codes?.join(' > ')}
                    </p>
                </Grid>
                <Grid
                    xs={2}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                    <a
                        className={styles.icon}
                        href={props.result.download}
                        target="_blank"
                        rel="noopener noreferrer">
                        <CloudDownloadIcon />
                    </a>
                    <a
                        className={styles.icon}
                        href={props.result.id}
                        target="_blank"
                        rel="noopener noreferrer">
                        <LaunchIcon />
                    </a>
                </Grid>
            </Grid>
            {open &&
                <p className={styles.description}>{ParseTex(props.result.summary)}</p>}
        </div>
    )
}

export default ResultCard;