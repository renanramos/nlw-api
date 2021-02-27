import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveyUserRepository } from '../reporitories/surveys-users-repository';

class NpsController {
	async execute(request: Request, response: Response) {
		const { surveyId } = request.params;
		const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

		const surveysUsers = await surveysUsersRepository.find({
			survey_id: surveyId,
			value: Not(IsNull())
		});

		const detractors = surveysUsers.filter(
			survey => survey.value >= 0 && survey.value <= 6
		).length;

		const promoters = surveysUsers.filter(
			survey => survey.value >= 9 && survey.value <= 10
		).length;

		const passive = surveysUsers.filter(
			survey => survey.value >= 7 && survey.value <= 8
		).length;

		const totalAnswers = surveysUsers.length;

		const calculate = (promoters - detractors) / totalAnswers * 100;

		return response.json({
			detractors,
			promoters,
			passive,
			totalAnswers,
			nps: calculate
		});
	}
}

export { NpsController };
