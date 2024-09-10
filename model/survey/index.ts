import { SurveyStatus } from '@/types';
import {
    Entity, Column, BaseEntity,
    PrimaryColumn
} from 'typeorm';

@Entity("survey")
export class SurveyEntity extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column("text")
    _id: string;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('int')
    dollarRewardValue: number;

    @Column('text')
    status: SurveyStatus

    @Column('text')
    reward: string
}