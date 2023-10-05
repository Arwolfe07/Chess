# WePlayChess(WPC)

## Features

* Authentication:
    * User signup and login using email and password
    * Useing token authentication

* Database (MongoDB):
    * Data for games and authentication stored in MongoDB Atlas

* Chess game:
    * Can be played in single and 2 player option
    * Create a room using GameID and share it for other user to join
    * Practice moves in single player mode and store and access previous saved games

* Toast messages:
    * Use toasts to show notifications

* Responsive Design for different screen sizes

## Note
* This project contains some info (.env file) that has been hidden for security purposes so please enter your credentials on cloning the repo
* This project is still being worked on

## Build using
### Front-end
1. [ReactJS](https://react.dev/) - A JavaScript library for building user interfaces
2. [Redux](https://redux.js.org/) - Predictable state container for JS apps
3. [socket.io-client](https://socket.io/docs/v4/client-api/) - Connecting to socket.io server for live movement tracing
4. [Axios](https://axios-http.com/docs/intro) - Promise based HTTP client for the browser and node.js

### Back-end
1. [NodeJs](https://nodejs.org/en/) - Node is an open source, cross-platform JavaScript run-time environment
2. [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
3. [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for nodejs
5. [JWT](https://jwt.io/) - JSON Web Token implementation in Javascript
6. [Bcrypt](https://www.npmjs.com/package/bcrypt) - A cryptographic hash function
7. [socket.io](https://socket.io/docs/v4/server-api/) - A server socket io for implementing live tracing and emmiting related signals

## Getting Started
### Clone or download this repository
```sh
git clone https://github.com/Arwolfe07/Chess
```

### Install dependencies
```sh
npm install
```






