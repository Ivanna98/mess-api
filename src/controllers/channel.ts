import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';

import * as channelServices from '../services/channelServices';

const {
  idUpdateChannel,
  idDeleteChannel,
  getAllChannels,
  idGetChannel,
} = channelServices;

interface Channel {
    id: string;
    title: string;
}

interface ErrorResponse {
  error: string;
}

interface EditParams extends ParamsDictionary {
  id: string;
}

interface EditResponse {
  updateChannel: {
    id: string;
    title: string;
  },
}

interface EditRequest {
  title: string;
}

type EditOne = RequestHandler<EditParams, EditResponse | ErrorResponse, EditRequest>;

export const putOne: EditOne = async (req, res) => {
  try {
    const titleToUpdate = req.body.title;

    const { id } = req.params;
    const updateChannel = await idUpdateChannel(id, titleToUpdate);

    if (!updateChannel) {
      throw new Error('Channel doesn`t exist');
    }

    const {
      title,
      _id,
    } = updateChannel;

    res.status(200).json({
      updateChannel: {
        id: _id,
        title,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

interface DeleteParams extends ParamsDictionary {
  id: string;
}

interface DeleteResponse {
  message: string;
}

interface DeleteRequest {
}

type DeleteOne = RequestHandler<DeleteParams, DeleteResponse | ErrorResponse, DeleteRequest>;

export const deleteOne: DeleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await idDeleteChannel(id);
    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

interface GetAllParams extends ParamsDictionary {
}

interface GetAllResponse {
  channels: Channel[];
}

interface GetAllRequest {
}

type GetAll = RequestHandler<GetAllParams, GetAllResponse | ErrorResponse, GetAllRequest>;

export const getAll: GetAll = async (req, res): Promise<void> => {
  try {
    const channels = await getAllChannels();
    const transformChannels = channels.map((channel) => {
      const {
        _id,
        title,
      } = channel;
      return ({
        id: _id,
        title,
      });
    });
    res.status(200).json({ channels: transformChannels });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

interface GetOneParams extends ParamsDictionary {
  id: string;
}

interface GetOneResponse {
  channel: {
    title: string;
    id: string;
  }
}

interface GetOneRequest {
}

type GetOne = RequestHandler<GetOneParams, GetOneResponse | ErrorResponse, GetOneRequest>;

export const getOne: GetOne = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const channel = await idGetChannel(id);
    if (channel) {
      const {
        title,
        _id,
      } = channel;
      res.status(200).json({
        channel: {
          title,
          id: _id,
        },
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
