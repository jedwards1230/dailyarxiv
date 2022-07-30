import { Box } from "@mui/joy"

const Section = (props: { children: React.ReactNode }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                my: 2,
                width: '100%',
                minHeight: '100%',
            }}>
            {props.children}
        </Box>
    )
}

export default Section