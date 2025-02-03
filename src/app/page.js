"use client";
import { useState, useEffect } from "react";
import { account } from "./appwrite";

import styles from './styles/page.module.css';

const LoginPage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserAccount = async () => {
            try {
                const session = await account.getSession('current');
                if (session) {
                    const user = await account.get();
                    setLoggedInUser(user);
                }
            } catch (error) {
                console.log("No active session found");
            } finally {
                setLoading(false);
            }
        };

        getUserAccount();
    }, []);

    const logout = async () => {
        await account.deleteSession("current");
        setLoggedInUser(null);
    };

    if (loading) {
        return <main className={styles.main}>Loading...</main>;
    }

    if (loggedInUser) {
        return (
            <main className={styles.main}>
                <p>Logged in as {loggedInUser.name}</p>
                <button
                    className={styles.button}
                    type="button"
                    onClick={logout}
                >
                    Logout
                </button>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <p>Not logged in</p>
        </main>
    );
};

export default LoginPage;
