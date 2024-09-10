import * as SQLite from "expo-sqlite";
import { DataSource } from 'typeorm';
import { SurveyEntity } from './survey';

export const source = new DataSource({
    database: 'survey.db',
    type: 'expo',
    driver: require('expo-sqlite'),
    entities: [SurveyEntity],
    synchronize: true,
});