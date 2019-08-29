import jwt from 'jsonwebtoken';
import User from '../models/User';
import { secret, expiresIn } from '../../config/auth';
import { isValidSchemaLogin } from '../validations/session';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!(await isValidSchemaLogin(req.body))) {
      return res.status(400).json({
        error: 'validation fail',
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: 'user not found',
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        error: 'password incorrent',
      });
    }
    const { id, name } = user;
    return res.send({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, secret, {
        expiresIn,
      }),
    });
  }
}

export default new SessionController();
