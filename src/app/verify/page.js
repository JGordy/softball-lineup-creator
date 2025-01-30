'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { account } from "../appwrite";

import styles from '../styles/page.module.css';

const VerifyPage = () => {
    const searchParams = useSearchParams();
    const [verificationStatus, setVerificationStatus] = useState('verifying');

    useEffect(() => {
        const verifyEmail = async () => {
            const secret = searchParams.get('secret');
            const userId = searchParams.get('userId');

            if (!secret || !userId) {
                setVerificationStatus('invalid');
                return;
            }

            try {
                await account.updateVerification(userId, secret);
                setVerificationStatus('success');
            } catch (error) {
                console.error('Verification error:', error);
                setVerificationStatus('error');
            }
        };

        verifyEmail();
    }, [searchParams]);

    const renderStatus = () => {
        switch (verificationStatus) {
            case 'verifying':
                return <p>Verifying your email...</p>;
            case 'success':
                return (
                    <div>
                        <p>Email verified successfully!</p>
                        <Link href="/login">Proceed to login</Link>
                    </div>
                );
            case 'error':
                return <p>Failed to verify email. Please try again or contact support.</p>;
            case 'invalid':
                return <p>Invalid verification link.</p>;
            default:
                return null;
        }
    };

    return (
        <main className={styles.main} style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Email Verification</h1>
            {renderStatus()}
        </main>
    );
};

export default VerifyPage;