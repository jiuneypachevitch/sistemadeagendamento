import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CollaboratorController from './app/controllers/CollaboratorController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import authMiddleware from './app/middlewares/Auth';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = new multer(multerConfig);

/* Rota para a criação (inserção) de um usuário no banco de dados */
routes.post('/users', (req, res) => { 
    UserController.store(req, res)
});

/* Rota para login e gerar o token de autenticação */
routes.post('/login', (req, res) => {
    SessionController.store(req, res)
});


/****************************************************** 
 * Rotas autenticadas a partir daqui!
******************************************************/ 
routes.use(authMiddleware);

// Alteração de usuários
routes.put('/users', (req, res) => { 
    UserController.update(req, res)
});

// upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

// Lista de Colaboradores
routes.get('/collaborators', CollaboratorController.index);

// Rota de agendamento
routes.post('/appointments', AppointmentController.store);

// Listagem de agendamento
routes.get('/appointments', AppointmentController.index);

// Listagem de agendamento do colaborador
routes.get('/schedule', ScheduleController.index);

// Listagem de notificações
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);


export default routes;
