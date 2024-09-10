import { SurveyStatus } from '@/types';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    PrimaryColumn,
} from 'typeorm';

@Entity("survey")
export class SurveyEntity extends BaseEntity {
    @PrimaryColumn("id")
    _id: string;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('enum')
    status: SurveyStatus

    @Column('json')
    reward: {
        type: 'points' | 'voucher'
        amount: number | {
            value: number
        }
    }
}