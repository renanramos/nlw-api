import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { SurveyUser } from '../models/survey-user';

@EntityRepository(SurveyUser)
class SurveyUserRepository extends Repository<SurveyUser> {}

export { SurveyUserRepository };
