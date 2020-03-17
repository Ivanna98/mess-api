
import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import * as userServices from '../services/userServices';

const { findUser, findAllUser } = userServices;

interface User {
  id: string;
  name: string;
  picture: string;
  onlineStatus: boolean;
}

interface ErrorResponse {
  error: string;
}

interface GetAllResponse {
  users: User[];
}

interface GetAllRequest {
}

type GetAll = RequestHandler<ParamsDictionary, GetAllResponse | ErrorResponse, GetAllRequest>;

export const getAll: GetAll = async (req, res) => {
  try {
    const users = await findAllUser();
    const transformUsers = users.map((user) => {
      const {
        _id, name, picture, onlineStatus,
      } = user;
      return ({
        id: _id,
        name,
        picture,
        onlineStatus,
      });
    });
    return res.status(200).json({ users: transformUsers });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

interface GetOneParams extends ParamsDictionary {
  id: string;
}

interface GetOneResponse {
  user: User;
}

interface GetAllRequest {
}

type GetOne = RequestHandler<GetOneParams, GetOneResponse | ErrorResponse, GetAllRequest>;
export const getOne: GetOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUser(id);
    if (user) {
      const {
        _id, name, picture, onlineStatus,
      } = user;
      return res.status(200).json({
        user: {
          id: _id,
          name,
          picture,
          onlineStatus,
        },
      });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
