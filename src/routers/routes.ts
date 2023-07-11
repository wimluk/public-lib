import { Router } from 'express';
import Controller from '@controllers/controller';

const router = Router();
const controller = new Controller();

router.get('/', controller.getIndex);

router.get('/api', controller.getApi);

router.get('/api/:id', controller.getApibyId);

export default router;
