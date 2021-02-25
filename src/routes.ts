import { Router } from 'express';
import { UserController } from './controllers/user-controller';
import { SurveyController } from './controllers/survey-controller';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

router.post('/users', userController.create);
router.get('/users', userController.show);

router.get('/surveys', surveyController.show);
router.post('/surveys', surveyController.create);

export { router };