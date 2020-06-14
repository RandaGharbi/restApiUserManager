import { Router } from 'express';
import handler from '../handlers';
import verifyToken from '../utils/verifyToken';

const router = Router();

router.get('/users', verifyToken, (req, res) => handler({ req, res, root: 'getUsers' }));
router.put('/user/:id', verifyToken, (req, res) => handler({ req, res, root: 'updateUser' }));
router.delete('/user/:id', verifyToken, (req, res) => handler({ req, res, root: 'removeUser' }));
router.post('/login', (req, res) => handler({ req, res, root: 'login' }));
router.post('/signup', (req, res) => handler({ req, res, root: 'signup' }));

export default router;
