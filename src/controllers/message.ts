import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import * as messageServices from '../services/messageServices';

const {
  getAllChannelMessage,
} = messageServices;

interface Message {
  id: string;
  text: string;
  createdAt: string;
  author: string;
  groupChannel: string;
}

interface ErrorResponse {
  error: string;
}

interface GetResponse {
  messages: Message[];
}

interface GetRequest {
}

type GetAll = RequestHandler<ParamsDictionary, GetResponse | ErrorResponse, GetRequest>;

export const getAll: GetAll = async (req, res) => {
  try {
    const { channel } = req.query;
    if (!channel) {
      throw new Error('Bad request');
    }
    const messages = await getAllChannelMessage(channel);
    const transformMessages = messages.map((message) => {
      const {
        _id,
        text,
        createdAt,
        author,
        groupChannel,
      } = message;
      return ({
        id: _id,
        text,
        author,
        createdAt,
        groupChannel,
      });
    });
    res.status(200).json({ messages: transformMessages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
