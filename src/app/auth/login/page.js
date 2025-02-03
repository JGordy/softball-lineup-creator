"use client";
import { useState } from "react";
import Link from "next/link";

import { account } from "../../appwrite";

import styles from '../../styles/page.module.css';

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const login = async () => {
        const { email, password } = formData;
        try {
            await account.createEmailPasswordSession(email, password);
            setLoggedInUser(await account.get());
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { type, value } = e.target;

        if (type === "text") {
            setName(value);
        } else {
            setFormData({
                ...formData,
                [type]: value,
            });
        }
    };

    return (
        <main className={styles.main}>
            <form className={styles.form}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button
                    className={styles.button}
                    type="button"
                    onClick={login}
                >
                    Login
                </button>
            </form>
            <div>
                <p>Don&apos;t have an account?</p>
                <Link className={styles.authLinks} href="/auth/register">Register</Link>
            </div>
        </main>
    );
};

export default LoginPage;
