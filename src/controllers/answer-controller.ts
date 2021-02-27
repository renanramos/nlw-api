import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/app-erros';
import { SurveyUserRepository } from '../reporitories/surveys-users-repository';

class AnswerController {
	async execute(request: Request, response: Response) {
		const { value } = request.params;
		const { u } = request.query;

		const surveyUserRepository = getCustomRepository(SurveyUserRepository);

		const surveyUser = await surveyUserRepository.findOne({
			id: String(u)
		});

		if (!surveyUser) {
			throw new AppError('Survey User dos not exist!');
		}

		surveyUser.value = Number(value);
		await surveyUserRepository.save(surveyUser);

		return response.json(surveyUser);
	}
}

export { AnswerController };
