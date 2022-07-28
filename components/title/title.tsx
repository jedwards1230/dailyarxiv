import { Link, Typography } from "@mui/joy"
import NextLink from 'next/link'
import styles from './Title.module.css'

const Title = () => {
    return (
        <div className={styles.title}>
            <Typography sx={{
                fontSize: '4rem',
                display: 'inline'
            }}>Daily</Typography>
            <Typography sx={{
                fontSize: '4rem',
                display: 'inline'
            }}><NextLink href="/" passHref>
                    <Link sx={{
                        textDecoration: 'none',
                    }}>
                        arXiv
                    </Link>
                </NextLink>
            </Typography>
        </div>
    )
}

export default Title