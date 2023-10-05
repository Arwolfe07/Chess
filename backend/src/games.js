// All our games are stored in the object games where key is gameId and value is array of two players in the game
const games = {};

// Player Class
class Player {
    constructor(name, color, playerId, gameId) {
        this.name = name;
        this.color = color;
        this.playerId = playerId;
        this.gameId = gameId;
    }
}

// addPlayer function to add a player
const addPlayer = ({ gameId, name, playerId }) => {
    // check if game has been created or not already
    if (!games[gameId]) {
        const color = Math.random() <= 0.5 ? 'w' : 'b';
        const player = new Player(name, color, playerId, gameId,); // order in constructor matters
        games[gameId] = [player];
        console.log(games[gameId].filter(player => player.playerId).length)
        return {
            message: 'Joined Successfully',
            opponent: null,
            player
        };
    }
    if (games[gameId].length > 2) {
        return { error: 'This Game is full!' };
    }
    
    const opponent = games[gameId][0];
    const color = opponent.color === 'w' ? 'b' : 'w';
    const player = new Player(name, color, playerId, gameId);
    games[gameId].push(player);
    return {
        message: 'Added Successfully',
        opponent,
        player
    };
};

const game = (id) => games[id];

// remove player if someone leaves the game and returns player who left the game
const removePlayer = (playerId) => {
    for (const game in games) {
        let players = games[game];
        const index = players.findIndex((pl) => pl.playerId === playerId);

        if (index !== -1) {
            return players.splice(index, 1)[0];
        }
    }
}

module.exports = { addPlayer, removePlayer, game };