import './styles/globals.css';
import { Inter } from 'next/font/google';

import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Rocket Roster',
    description: 'Powerful roster management for your team',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
