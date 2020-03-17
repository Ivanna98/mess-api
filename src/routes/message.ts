import express from 'express';
import { protect } from '../middleware/protect';
import { getAll } from '../controllers/message';

export const router = express.Router();

router.get('/', protect, getAll);
