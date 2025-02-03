import Link from "next/link";
import styles from "../styles/header.module.css";

const Header = () => {
    return (
        <header>
            <h1>Rocket Roster</h1>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/auth/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;