import { Router } from 'express';
import UserController from '../controllers/user.controllers.js';
import { checkAuth } from '../middlewares/authJwt.js';
// import passport from 'passport';
// import currentJwtStrategy from '../passport/current.strategies.js'; // Importamos la estrategia "currentJwtStrategy"

const controller = new UserController();

const router = Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/profile', checkAuth, controller.profile);

export default router;