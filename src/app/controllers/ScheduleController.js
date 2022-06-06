import User from '../models/User';
import { startOfDay, parseISO, endOfDay } from 'date-fns';
import Appointment from '../models/Appointment';
import { between } from 'sequelize/lib/operators';


class ScheduleController {
    async index(req, res) {

        const checkUser = await User.findOne({
            where: {
                id: req.userId,
                isProvider: true,
            }
        });
        if (!checkUser)
            return res.status(400).json({message: 'Este usuário não é um colaborador.'});

        const { date } = req.query;
        const parseDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                collaborator_id: req.userId,
                canceled_at: null,
                appointmentDate: {
                    [between]: [ startOfDay(parseDate), endOfDay(parseDate) ],
                },
            },
            order: ['date'],
        }); 

        return res.json(appointments);
    }
}

export default new ScheduleController();

