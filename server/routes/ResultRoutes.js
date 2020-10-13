import { Router } from 'express';
import ResultController from '../controllers/ResultController';

const router = Router();

router.get('/', ResultController.getAll);
router.post('/', ResultController.add);
router.get('/:id', ResultController.getOne);
router.put('/:id', ResultController.update);
router.delete('/:id', ResultController.deleteResult);

export default router;