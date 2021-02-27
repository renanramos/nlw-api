import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../reporitories/survey-repository';
import { SurveyUserRepository } from '../reporitories/surveys-users-repository';
import { UsersRepository } from '../reporitories/user-repository';
import sendMailService from '../services/send-mail-service';
import { resolve } from 'path';
import { AppError } from '../errors/app-erros';

class SendMailController {
	async execute(request: Request, response: Response) {
		const { email, survey_id } = request.body;

		const usersRepository = getCustomRepository(UsersRepository);
		const surveyRepository = getCustomRepository(SurveyRepository);
		const surveyUserRepository = getCustomRepository(SurveyUserRepository);

		const user = await usersRepository.findOne({ email });

		if (!user) {
			throw new AppError('User does not exist');
		}

		const survey = await surveyRepository.findOne({
			id: survey_id
		});

		if (!survey) {
			throw new AppError('Survey does not exist');
		}

		const npsPath = resolve(__dirname, '..', 'views', 'emails', 'nps-mail.hbs');

		const surveyUserAlreadyExist = await surveyUserRepository.findOne({
			where: { user_id: user.id, value: null },
			relations: ['user', 'survey']
		});

		const variables = {
			name: user.name,
			title: survey.title,
			description: survey.description,
			id: '',
			link: process.env.URL_MAIL
		};

		if (surveyUserAlreadyExist) {
			variables.id = surveyUserAlreadyExist.id;
			await sendMailService.execute(email, survey.title, variables, npsPath);
			return response.json(surveyUserAlreadyExist);
		}

		const surveyUser = surveyUserRepository.create({
			user_id: user.id,
			survey_id
		});

		await surveyUserRepository.save(surveyUser);

		variables.id = surveyUser.id;

		await sendMailService.execute(email, survey.title, variables, npsPath);

		return response.status(201).json(surveyUser);
	}
}

export { SendMailController };
