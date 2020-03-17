import { Request, Response } from 'express';
import { generateToken } from '../utils/generateToken';
import { config } from '../config';

export const authCallback = async (req: Request, res: Response): Promise<void> => {
  const token = await generateToken({ id: req.user._id });
  res.redirect(`${config.feUrl}/success?token=${token}`);
};
