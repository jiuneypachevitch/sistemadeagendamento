import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/Auth';
import { object, string }  from 'yup';

class SessionController {
    async store(req, res) {
        const schema = object({
            userEmail: string().email().required(),
            userPassword: string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                message: 'Falha na validação dos dados.',
            });
        }
        const { userEmail, userPassword } = req.body;
        const user = await User.findOne({
            where: {
                userEmail
            },
        });

        if (!user)
            return res.status(401).json({
                error: 'Usuario não encontrado.',
            });
        if (!(await user.checkPassword(userPassword))) {
            console.log('success');
            return res.status(401).json({
                error: 'Senha inválida!',
            });
        }

        const { id, userName } = user;
        return res.json({
            user: {
                userId: id, 
                userName,
                userEmail,
            },
            token: jwt.sign({
                id
            }, authConfig.secret,
            {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}
export default new SessionController();
