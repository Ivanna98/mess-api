import express from 'express';
import { protect } from '../middleware/protect';
import {
  putOne, deleteOne, getAll, getOne,
} from '../controllers/channel';

export const router = express.Router();

router.put('/:id', protect, putOne);
router.delete('/:id', protect, deleteOne);
router.get('/', protect, getAll);
router.get('/:id', protect, getOne);
