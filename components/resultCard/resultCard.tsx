import { Grid, Link, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import IconButton from '@mui/joy/IconButton';
import { useState } from "react";
import LaunchIcon from '@mui/icons-material/Launch';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ParseTex from "../../scripts/texParser";
import { useThemeChecker } from "../../scripts/theme";
import { grey } from "@mui/material/colors";


const ResultCard = (props: { result: ArchiveResult, i: number }) => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useThemeChecker();

    return (
        <Card
            variant="outlined"
            sx={{
                py: 1.25,
                borderRadius: '0.5rem',
                backgroundColor: (mode === 'dark') ? grey[900] : grey[50],
                '&:hover, &:focus': {
                    backgroundColor: (mode === 'dark') ? grey[800] : grey[100],
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
                <Grid xs={10}>
                    <Typography sx={{ mb: 1, width: "90%", fontSize: 15 }} textColor="text.secondary">
                        {props.result.author.map((author, i: number) => (i === props.result.author.length - 1) ? author : author + ', ')}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} color="primary" gutterBottom>
                        {props.result.codes?.join(' > ')}
                    </Typography>
                </Grid>
                <Grid xs={2}>
                    <IconButton
                        variant="plain"
                        component='a'
                        href={props.result.download}
                        target="_blank"
                        size="sm"
                        rel="noopener noreferrer">
                        <CloudDownloadIcon />
                    </IconButton>
                    <IconButton
                        variant="plain"
                        component='a'
                        href={props.result.id}
                        target="_blank"
                        size="sm"
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

export default ResultCard;