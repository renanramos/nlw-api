import { Router } from 'express';
import { UserController } from './controllers/user-controller';
import { SurveyController } from './controllers/survey-controller';
import { SendMailController } from './controllers/send-mail-controller';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);
router.get('/users', userController.show);

router.get('/surveys', surveyController.show);
router.post('/surveys', surveyController.create);

router.post('/send-mail', sendMailController.execute);

export { router };
