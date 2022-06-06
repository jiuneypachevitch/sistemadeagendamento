import User from '../models/User';
import { object, string }  from 'yup';

class UserController {
    async store(req, res) {
        const schema = object({
            userName: string().required(),
            userEmail: string().email().required(),
            userPassword: string().required().min(4),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                message: 'Falha na validação.',
            });
        }

        const userExists = await User.findOne({
            where: { userEmail: req.body.userEmail },
        });
        if (userExists) {
            return res.status(400).json({
                error: 'Usuário já cadastrado.',
            });
        }
        const { id, userName, userEmail, isProvider } = await User.create(req.body);       
        return res.json({
            userId: id,
            userName,
            userEmail,
            isProvider
        });
    }
    async update(req, res) {
        const schema = object({
            userName: string().required(),
            userEmail: string().email().required(),
            oldPassword: string().min(4).when(
                ['userPassword'], {
                    // adicionar validação com confirmação de senha para alterar o email.
                    is: (userPassword) => userPassword != undefined,
                    then: (schema) => schema.required(),
                }
            ),
            userPassword: string().min(4),
            userPasswordConfirm: string().min(4).when(
                ['userPassword'], {
                    is: (userPassword) => userPassword != undefined,
                    then: (schema) => schema.required(),
                }
            ),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                message: 'Falha na validação dos dados recebidos.',
            });
        };

        const { userEmail, oldPassword, userPassword, userPasswordConfirm } = req.body;
        const user = await User.findByPk(req.userId);
        if (userEmail && userEmail != user.userEmail) {
            const userExists = await User.findOne({
                where: { userEmail },
            });
            if (userExists) {
                return res.status(400).json({
                    error: 'Usuário já cadastrado.',
                });
            }
        }
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({
                message: 'A senha não confere.',
            });
        }

        if (userPassword && userPasswordConfirm && !(userPassword == userPasswordConfirm)) {
            return res.status(401).json({
                message: 'A senha e a confirmação da senha não coincidem.',
            });
        }

        const { userName, isProvider } = await user.update(req.body);

        return res.json({ userId: req.userId, userName, userEmail, isProvider });
    }
}

export default new UserController();
