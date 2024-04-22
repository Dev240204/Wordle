# Wordle Game

Wordle is a simple yet addictive word puzzle game where players try to guess a secret five-letter word within a limited number of attempts.

## Description

This project is a web-based implementation of the classic Wordle game. Players are presented with an empty word grid and given chances to guess the hidden word. After each guess, feedback is provided indicating correct letters and their positions.

## Installation

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account for database storage

### Client Side (React with Tailwind CSS)

```
git clone https://github.com/your-username/wordle-game.git
cd wordle-game/client
npm install
npm start
```

Open your browser and visit `http://localhost:3000` to play the game!

### Server Side (Node.js with Express)

```
cd ../
npm install
```

Create a `.env` file in the server directory and add your MongoDB Atlas connection string:

```
MONGODB_URI=your_mongodb_atlas_connection_string
```

```
npm start
```

The server will start running on `http://localhost:5000`.

## Tech Stack

- Frontend:
  - React
  - Tailwind CSS

- Backend:
  - Node.js
  - Express

- Database:
  - MongoDB Atlas

## Contributing

Dev Panchal
