import { SurveyEntity } from ".";
import { source } from "../database";

export class SurveyRepository {
    async getSurveys(): Promise<SurveyEntity[]> {
        if (!source.isInitialized) await source.initialize();

        const surveys = await SurveyEntity.find();
        console.log({ surveys })
        return surveys;
    }

    async getSurvey(surveyId: SurveyEntity['_id']): Promise<SurveyEntity> {
        if (!source.isInitialized) await source.initialize();

        const survey = await SurveyEntity.findOneByOrFail({ _id: surveyId });
        return survey;
    }

    async addRecentSurvey(payload: Pick<SurveyEntity, 'name' | 'description' | "dollarRewardValue" | "_id">) {
        if (!source.isInitialized) await source.initialize();

        const survey = new SurveyEntity();
        survey.name = payload.name;
        survey.description = payload.description;
        survey.dollarRewardValue = payload.dollarRewardValue;
        await survey.save().then(console.log).catch(console.log);
        console.log({ survey })
    }

    async updateSurvey(
        surveyId: SurveyEntity['_id'],
        payload: Partial<Pick<SurveyEntity, 'name' | 'description' | 'status' | 'reward'>>
    ) {
        if (!source.isInitialized) await source.initialize();

        const survey = await SurveyEntity.findOneByOrFail({ _id: surveyId });
        survey.name = payload.name ?? survey.name;
        survey.description = payload.description ?? survey.description;
        survey.status = payload.status ?? survey.status;
        survey.reward = payload.reward ?? JSON.stringify(survey.reward);
        await survey.save();
    }

    async deleteSurvey(surveyId: SurveyEntity['_id']) {
        if (!source.isInitialized) await source.initialize();

        await SurveyEntity.delete(surveyId);
    }

}