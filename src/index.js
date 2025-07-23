'use strict';
import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.router.js';
import { messageRouter } from './routes/message.router.js';
import { roomRouter } from './routes/room.routes.js';
import { WebSocketServer } from 'ws';
import { messageEmitter } from './controllers/message.controller.js';

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: '*',
  }),
);

app.use('/user', userRouter);
app.use('/rooms', roomRouter);
app.use('/rooms', messageRouter);

app.get('/', (req, res) => {
  res.send('Server is OK');
});

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server is running');
});

const wss = new WebSocketServer({ server });

messageEmitter.on('message', (message) => {
  for (const client of wss.clients) {
    client.send(JSON.stringify(message));
  }
});
