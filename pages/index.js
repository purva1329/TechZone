// Virtual Board Game Platform using Next.js + Socket.io
// Games included: Ludo, Snakes & Ladders, Bubbles, Running

// 1. server.js - Custom Express server with Socket.io support
const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('rollDice', () => {
      const dice = Math.floor(Math.random() * 6) + 1;
      io.emit('diceRolled', dice);
    });

    socket.on('moveToken', (data) => {
      io.emit('tokenMoved', data);
    });

    socket.on('bubbleHit', (bubbleId) => {
      io.emit('bubblePopped', bubbleId);
    });

    socket.on('runnerUpdate', (data) => {
      io.emit('runnerMoved', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = 3000;
  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

// 2. pages/index.js - Home Page with Links to All Games
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">🎮 Virtual Board Games</h1>
      <Link href="/games/ludo" className="block text-blue-600 underline mb-2">Play Ludo</Link>
      <Link href="/games/snakes" className="block text-green-600 underline mb-2">Play Snakes & Ladders</Link>
      <Link href="/games/bubbles" className="block text-purple-600 underline mb-2">Play Bubble Pop</Link>
      <Link href="/games/running" className="block text-pink-600 underline">Play Running Game</Link>
    </div>
  );
}

// 3. pages/games/ludo.js - Ludo Game
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
let socket;

export default function LudoGame() {
  const [dice, setDice] = useState(1);

  useEffect(() => {
    socket = io();
    socket.on('diceRolled', (number) => setDice(number));
    socket.on('tokenMoved', (data) => console.log('Token moved:', data));
    return () => socket.disconnect();
  }, []);

  return (
    <div className="text-center p-10">
      <h2 className="text-xl font-bold">Ludo Game</h2>
      <p>Dice: {dice}</p>
      <button onClick={() => socket.emit('rollDice')} className="btn">Roll Dice</button>
      <button onClick={() => socket.emit('moveToken', { position: Math.random() * 50 })} className="btn">Move Token</button>
    </div>
  );
}

// 4. pages/games/snakes.js - Snakes & Ladders (shared logic with Ludo)
export default function SnakesGame() {
  return (
    <div className="text-center p-10">
      <h2 className="text-xl font-bold">Snakes & Ladders</h2>
      <p>Coming soon: Shared logic with dice + grid based movement</p>
    </div>
  );
}

// 5. pages/games/bubbles.js - Bubble Pop Game
import { useEffect, useState } from 'react';
let socket2;

export default function Bubbles() {
  const [bubbles, setBubbles] = useState([
    { id: 1, popped: false },
    { id: 2, popped: false },
    { id: 3, popped: false },
  ]);

  useEffect(() => {
    socket2 = io();
    socket2.on('bubblePopped', (id) => {
      setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    });
    return () => socket2.disconnect();
  }, []);

  const popBubble = (id) => {
    socket2.emit('bubbleHit', id);
  };

  return (
    <div className="text-center p-10">
      <h2 className="text-xl font-bold">Bubble Pop</h2>
      {bubbles.map(b => (
        <button
          key={b.id}
          onClick={() => popBubble(b.id)}
          className={`m-2 p-4 rounded-full ${b.popped ? 'bg-gray-400' : 'bg-blue-400'}`}
        >
          {b.popped ? '💥' : '🔵'}
        </button>
      ))}
    </div>
  );
}

// 6. pages/games/running.js - Running Game (basic version)
import { useEffect } from 'react';
let socket3;

export default function RunningGame() {
  useEffect(() => {
    socket3 = io();
    const handleMove = () => {
      const distance = Math.floor(Math.random() * 10);
      socket3.emit('runnerUpdate', { distance });
    };
    window.addEventListener('keydown', handleMove);
    socket3.on('runnerMoved', data => console.log('Runner moved:', data));
    return () => {
      window.removeEventListener('keydown', handleMove);
      socket3.disconnect();
    };
  }, []);

  return (
    <div className="text-center p-10">
      <h2 className="text-xl font-bold">Running Game</h2>
      <p>Press any key to run!</p>
    </div>
  );
}
