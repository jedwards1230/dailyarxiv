import NextLink from 'next/link'
import styles from './Title.module.css'

const Title = () => {
    return (
        <div className={styles.title}>
            <NextLink href="/" passHref>
                <a>
                    <p className={styles.titleMain}>Daily</p>
                    <p className={styles.titleLink}>arXiv</p>
                </a>
            </NextLink>
        </div >
    )
}

export default Title