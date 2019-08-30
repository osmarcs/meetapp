import User from '../models/User';
import {
  isValidSchemaCreateUser,
  isValidSchemaUpdateUser,
} from '../validations/user';

class UserController {
  async store(req, res) {
    if (!(await isValidSchemaCreateUser(req.body))) {
      return res.status(400).json({
        error: 'validation fail',
      });
    }

    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email } = await User.create(req.body);
    return res.status(201).json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    if (!(await isValidSchemaUpdateUser(req.body))) {
      return res.status(400).json({
        error: 'validation fail',
      });
    }
    const { email, password, oldPassword = '' } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: {
          email,
        },
      });
      if (userExists) {
        return res.status(400).json({ error: 'user already exists' });
      }
    }

    if ((oldPassword || password) && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json('password doesnt match');
    }

    const { id, name } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
