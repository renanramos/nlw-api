import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '../models/user';
import { UsersRepository } from '../reporitories/user-repository';

class UserController {

  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if(userAlreadyExists) {
      return response.status(400).json({
        error: "User already exist!"
      });
    }

    const user = usersRepository.create({
      name, email
    });

    await usersRepository.save(user);

    return response.json(user);
  }

  async show(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return response.status(200).json(users);
  }
}

export { UserController };
