import { Router } from 'express';

import AuthenticateUserservice from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserservice();

    const {user, token} = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

          
    return response.json({user, token});

           
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
