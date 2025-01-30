"use client";
import { useState } from "react";
import { account, ID } from "./appwrite";

import styles from './styles/page.module.css';

const LoginPage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [name, setName] = useState("");

    const login = async () => {
        const { email, password } = formData;
        try {
            await account.createEmailPasswordSession(email, password);
            setLoggedInUser(await account.get());
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

    const logout = async () => {
        await account.deleteSession("current");
        setLoggedInUser(null);
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
                    onClick={login}
                >
                    Login
                </button>
                <button
                    className={styles.button}
                    type="button"
                    onClick={register}
                >
                    Register
                </button>
            </form>
        </main>
    );
};

export default LoginPage;
