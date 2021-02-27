import { Router } from 'express';
import { UserController } from './controllers/user-controller';
import { SurveyController } from './controllers/survey-controller';
import { SendMailController } from './controllers/send-mail-controller';
import { AnswerController } from './controllers/answer-controller';
import { NpsController } from './controllers/nps-controller';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post('/users', userController.create);
router.get('/users', userController.show);

router.get('/surveys', surveyController.show);
router.post('/surveys', surveyController.create);

router.post('/send-mail', sendMailController.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps/:surveyId', npsController.execute);

export { router };
