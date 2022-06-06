import { object, number, date as yupDate} from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR'
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notifications from '../schema/Notifications';

class AppointmentController {
    async index(req, res) {
        const { page } = req.query;

        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null,
            },
            order: ['date'],
            attributes: ['id', 'appointmentDate'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                { 
                    model: User, 
                    as: 'collaborator', 
                    attributes: ['id', 'userName'],
                    include: [
                        {
                            model: File, 
                            as: 'photo',
                            attributes: ['id', 'filePath', 'url'],
                        }
                    ],
                }
            ],
        });
        return res.json(appointments);
    }
    async store(req, res) {
        const schema = object({
            collaborator_id: number().required(),
            appointmentDate: yupDate().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                message: 'Falha na validação.',
            });
        }
        const { collaborator_id, appointmentDate } = req.body;
        const isCollaborator = await User.findOne({ 
            where: {
                id: collaborator_id,
                isProvider: true,
            }
        });
        if (!isCollaborator)
            return res.status(401).json({message: 'Colaborador não localizado.'});
        const startHour = startOfHour(parseISO(appointmentDate));

        if (isBefore(startHour, new Date()))
            return res.status(400).json({
                message: 'Horário não disponível!',
            });
        const checkAvaialability = await Appointment.findOne({
            where: {
                collaborator_id,
                canceled_at: null,
                appointmentDate: startHour,
            }
        });
        if (checkAvaialability) {
            return res.status(400).json({
                message: 'Horário não disponível para este colaborador.',
            });
        }
        const appointment = await Appointment.create({
            user_id: req.userId,
            collaborator_id,
            appointmentDate: startHour,
        });

        const user = await User.findByPk(req.userId);
        const formattedDateTime = format(
            startHour, 
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            {
                locale: ptbr,
            }
        );
        await Notifications.create({
            content: `Novo agendamento para ${user.userName} no ${formattedDateTime}.`,
            user: collaborator_id,

        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
