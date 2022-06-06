import File from '../models/File'; 


class FileController {
    async store(req, res) {
        const { originalname: fileName, filename: filePath } = req.file;

        const file = await File.create({
            fileName,
            filePath,
        });

        return res.json(file);
    }
}

export default new FileController();
