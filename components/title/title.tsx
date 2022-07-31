import { Link, Typography } from "@mui/joy"
import NextLink from 'next/link'
import styles from './Title.module.css'

const Title = () => {
    return (
        <div className={styles.title}>
            <NextLink href="/" passHref>
                <Link>
                    <Typography sx={{
                        fontSize: '4rem',
                        display: 'inline',
                        textDecoration: 'none',
                        color: 'text.primary'
                    }}>Daily</Typography>
                    <Typography sx={{
                        fontSize: '4rem',
                        display: 'inline',
                        color: 'primary.main'
                    }}>arXiv
                    </Typography>
                </Link>
            </NextLink>
        </div >
    )
}

export default Title