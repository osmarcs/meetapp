import User from '../models/User';
import { isValidSchemaCreatUser } from '../validations/user';

class UserController {
  async store(req, res) {
    if (!(await isValidSchemaCreatUser(req.body))) {
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
}

export default new UserController();
