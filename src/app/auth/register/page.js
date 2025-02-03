"use client";
import { useState } from "react";
import Link from "next/link";
import { account, ID } from "../../appwrite";

import styles from '../../styles/page.module.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [name, setName] = useState("");

    const login = async () => {
        const { email, password } = formData;
        try {
            await account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error(error);
        }
    };

    const register = async () => {
        const { email, password } = formData;
        try {
            await account.create(ID.unique(), email, password, name);
            await login(email, password);

            await account.createVerification('http://localhost:3000/verify');
        } catch (error) {
            console.log(error);
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
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleInputChange}
                />
                <button
                    className={styles.button}
                    type="button"
                    onClick={register}
                >
                    Register
                </button>
            </form>
            <p>Already have an account? <Link href="/auth/login">Login</Link></p>
        </main>
    );
};

export default RegisterPage;
