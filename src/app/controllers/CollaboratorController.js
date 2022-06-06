import User from '../models/User';
import File from '../models/File';

class CollaboratorController {
    async index(req, res) {
        const collaborators = await User.findAll({
            where: { 
                isProvider: true,
            },
            attributes: ['id', 'userName', 'userEmail', 'photo_id'],
            include: { 
                model: File, 
                as: 'photo',
                attributes: ['fileName', 'filePath', 'url'],
            },
        });
        return res.json(collaborators);
    }
}

export default new CollaboratorController;
