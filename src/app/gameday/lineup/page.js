'use client'
import { useState } from 'react';

import styles from '../../styles/page.module.css';
import lineupStyles from './lineup.module.css';
import players from '../../constants/players';

import createBattingOrder from '../../utils/createBattingOrder';
import createFieldingChart from '../../utils/createFieldingChart';
import PlayerChart from '../../components/PlayerChart';

const GameDay = () => {
    const [playerChart, setPlayerChart] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // Define an asynchronous function to send POST request to our api
    const generateBattingOrder = async () => {
        setPlayerChart();
        setIsLoading(true);
        try {
            // use the fetch method to send an http request to /api/generate endpoint
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: players }),
            });

            // Waits for the response to be converted to JSON format and stores it in the data variable
            const data = await response.json();

            //  If successful, updates the output state with the output field from the response data
            if (response.ok) {
                setPlayerChart(data.output);
            } else {
                setError(data.error);
            }
            setIsLoading(false);

            // Catches any errors that occur during the fetch request
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
            setError('An error occurred. Please try again later.');
        }
    }

    const getBattingOrder = async () => {
        setPlayerChart();
        setIsLoading(true);
        // Create batting order and fielding chart
        const batting = createBattingOrder(players);

        if (batting?.length > 0) {
            const fieldingChart = createFieldingChart(batting);

            if (fieldingChart?.length > 0) {
                setPlayerChart(fieldingChart);
            }
        }
        setIsLoading(false);
    };

    return (
        <main className={styles.main}>
            <div className={lineupStyles.buttonContainer}>
                <button onClick={getBattingOrder} className={lineupStyles.button}>
                    Get Batting Order
                </button>

                <button onClick={generateBattingOrder} className={lineupStyles.button}>
                    Generate Batting Order
                </button>
            </div>
            {isLoading && <p>Generating Batting Order...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!error && <PlayerChart playerChart={playerChart} />}
        </main>
    )
}

export default GameDay;
