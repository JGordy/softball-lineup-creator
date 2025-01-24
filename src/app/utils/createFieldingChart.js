import positions from "../constants/positions";

function countOutPositions(player) {
    return player.positions.filter(pos => pos === "Out").length;
}

function hasReachedOutLimit(player, playerCount) {
    const maxOuts = playerCount > 12 ? 2 : 1;
    return countOutPositions(player) >= maxOuts;
}

function getUnassignedPlayers(players, inning) {
    return players.filter(player => !player.positions[inning]);
}

function getUnfilledPositions(players, inning, allPositions) {
    const filledPositions = new Set(players.map(p => p.positions[inning]).filter(Boolean));
    return allPositions.filter(pos => pos !== "Out" && !filledPositions.has(pos));
}

function assignPlayerToPosition(player, position, inning, playerCount) {
    if (!player.positions[inning]) {
        if (position === "Out" && hasReachedOutLimit(player, playerCount)) {
            return false;
        }
        player.positions[inning] = position;
        return true;
    }
    return false;
}

function createFieldingChart(players, innings = 7) {
    const playerData = players.map(player => ({
        ...player,
        positions: new Array(innings).fill(null)
    }));

    for (let inning = 0; inning < innings; inning++) {
        // Step 1: Handle previously out players
        if (inning > 0) {
            const previouslyOut = playerData.filter(
                player => player.positions[inning - 1] === "Out"
            );
            for (const player of previouslyOut) {
                const preferredPosition = player.preferredPositions.find(pos =>
                    !playerData.some(p => p.positions[inning] === pos)
                );
                if (preferredPosition) {
                    assignPlayerToPosition(player, preferredPosition, inning, players.length);
                }
            }
        }

        // Step 2: Fill preferred positions
        let unfilledPositions = getUnfilledPositions(playerData, inning, positions);
        for (const position of unfilledPositions) {
            const availablePlayer = getUnassignedPlayers(playerData, inning)
                .find(player => player.preferredPositions.includes(position));
            if (availablePlayer) {
                assignPlayerToPosition(availablePlayer, position, inning, players.length);
            }
        }

        // Step 3: Fill remaining field positions
        unfilledPositions = getUnfilledPositions(playerData, inning, positions);
        let unassignedPlayers = getUnassignedPlayers(playerData, inning);

        unfilledPositions.forEach((position, index) => {
            if (unassignedPlayers[index]) {
                assignPlayerToPosition(unassignedPlayers[index], position, inning, players.length);
            }
        });

        // Step 4: Assign "Out" positions based on count
        unassignedPlayers = [...getUnassignedPlayers(playerData, inning)]
            .sort((a, b) => countOutPositions(a) - countOutPositions(b));

        for (const player of unassignedPlayers) {
            if (!hasReachedOutLimit(player, players.length)) {
                assignPlayerToPosition(player, "Out", inning, players.length);
            }
        }

        // Step 5: Handle any remaining unassigned players
        const remainingPlayers = getUnassignedPlayers(playerData, inning);
        for (const player of remainingPlayers) {
            const position = getUnfilledPositions(playerData, inning, positions)[0];
            if (position) {
                assignPlayerToPosition(player, position, inning, players.length);
            } else {
                // Only force "Out" if absolutely necessary
                if (!hasReachedOutLimit(player, players.length)) {
                    player.positions[inning] = "Out";
                } else {
                    // Find someone with fewer outs to swap with
                    const swapCandidate = playerData.find(p =>
                        p.positions[inning] === "Out" &&
                        !hasReachedOutLimit(p, players.length)
                    );
                    if (swapCandidate) {
                        swapCandidate.positions[inning] = player.positions[inning];
                        player.positions[inning] = "Out";
                    }
                }
            }
        }
    }

    return playerData;
}

export default createFieldingChart;