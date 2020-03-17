import express from 'express';
import { protect } from '../middleware/protect';
import { getAll, getOne } from '../controllers/user';

export const router = express.Router();

router.get('/', protect, getAll);
router.get('/:id', protect, getOne);
