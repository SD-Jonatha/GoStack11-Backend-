import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreatUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarservice';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const UsersRouter = Router();
const upload = multer(uploadConfig);

UsersRouter.post('/', async (request, response)=> {
  try {
    const { name, email, password} = request.body;

    const createUser = new CreatUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;
    return response.json(user);
  }catch (err) {
    return response.status(400).json({ error: err.message});
  }

});

UsersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response)=> {
    try{      
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
      }); 

      delete user.password;

      return response.json({ user });
    }catch (err){
      return response.status(400).json({ error: err.message});
    }
  },
);

export default UsersRouter;