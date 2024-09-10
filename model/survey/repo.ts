import { SurveyEntity } from ".";
import { source } from "../database";

export class SurveyRepository {
    async getSurveys(): Promise<SurveyEntity[]> {
        if (!source.isInitialized) await source.initialize();

        const surveys = await SurveyEntity.find();

        return surveys;
    }

    async getSurvey(surveyId: SurveyEntity['_id']): Promise<SurveyEntity> {
        if (!source.isInitialized) await source.initialize();

        const survey = await SurveyEntity.findOneByOrFail({ _id: surveyId });
        return survey;
    }

    async createSurvey(payload: Pick<SurveyEntity, 'title' | 'description'>) {
        if (!source.isInitialized) await source.initialize();

        const survey = new SurveyEntity();
        survey.title = payload.title;
        survey.description = payload.description;
        await survey.save();
    }

    async updateSurvey(
        surveyId: SurveyEntity['_id'],
        payload: Partial<Pick<SurveyEntity, 'title' | 'description' | 'status' | 'reward'>>
    ) {
        if (!source.isInitialized) await source.initialize();

        const survey = await SurveyEntity.findOneByOrFail({ _id: surveyId });
        survey.title = payload.title ?? survey.title;
        survey.description = payload.description ?? survey.description;
        survey.status = payload.status ?? survey.status;
        survey.reward = payload.reward ?? survey.reward;
        await survey.save();
    }

    async deleteSurvey(surveyId: SurveyEntity['_id']) {
        if (!source.isInitialized) await source.initialize();

        await SurveyEntity.delete(surveyId);
    }

}