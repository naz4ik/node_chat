import { Message } from '../models/Message.route.js';

const findMessages = async (roomId) => {
  return Message.findAll({ where: { roomId } });
};

const createNewMessage = (roomId, text, userId) => {
  return Message.create({ roomId, userId, text });
};

export const messagesService = {
  findMessages,
  createNewMessage,
};
