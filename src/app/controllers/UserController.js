import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email } = await User.create(req.body);
    res.status(201).json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
