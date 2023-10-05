const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");
const socketio = require('socket.io');
const { addPlayer, game, removePlayer } = require("./src/games");
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = require('http').createServer(app);
const io = socketio(server);

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.get('/', (req, res) => res.send('This is chess backend server'));
app.use('/user', userRoutes);

io.on("connect", (socket) => {
    // callback function from client
    // console.log(socket.connected)
    socket.on('join', ({ name, gameId }, callback) => {
        const { error, player, opponent } = addPlayer({ name, gameId, playerId: socket.id });
        if (error) {
            return callback({ error });
        }
        socket.join(gameId); // room
        callback({ color: player.color });
        // send welcome message to player 1 and info of opponent
        socket.emit('welcome', {
            message: `Hello ${player.name}, Welcome to the game`,
            opponent
        });

        // tell player 2 that player 1 has joined
        socket.broadcast.to(player.gameId).emit('opponentJoin', {
            message: `${player.name} has joined the game.`,
            opponent: player
        });

        // check if room is full or not
        if (game(gameId).length === 2) {
            const white = game(gameId).find((player) => player.color === 'w');
            io.to(gameId).emit('message', {
                message: `Let's begin the game. White ${white.name} goes first!`
            });
        }
    })

    // move is signalled to tell that opponent has moved
    socket.on('move', ({ from, to, gameId }) => {
        socket.broadcast.to(gameId).emit('opponentMove', { from, to });
    })

    // when we close the game
    socket.on('disconnect', () => {
        const player = removePlayer(socket.id);
        // if player leaves game
        if (player) {
            io.to(player.game).emit('message', {
                message: `${player.name} has left the game.`,
            });
            socket.broadcast.to(player.game).emit('opponentLeft');
        }
    });
});

const DB_URL = process.env.MONGO_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(server.listen(PORT, () => console.log(`Server started on port ` + PORT)))
    .catch((err) => console.log(err.message));


