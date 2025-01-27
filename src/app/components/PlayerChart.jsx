import styles from '../styles/page.module.css';

const PlayerChart = ({ playerChart }) => {
    if (!playerChart) {
        return null;
    }

    return (
        <table className={styles.lineupTable}>
            <thead>
                <tr>
                    <th>Batting Order</th>
                    <th>Player</th>
                    {(
                        <>
                            {Array.from({ length: 7 }, (_, i) => (
                                <th key={i}>Inning {i + 1}</th>
                            ))}
                        </>
                    )}
                </tr>
            </thead>
            <tbody>
                {playerChart.map((player, index) => (
                    <tr key={player.name + index}>
                        <td>{index + 1}.</td>
                        <td>{player.name}</td>
                        {(
                            <>
                                {Array.from({ length: 7 }, (_, i) => (
                                    <td key={i}>{playerChart[index].positions[i] || "Out"}</td>
                                ))}
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PlayerChart;
