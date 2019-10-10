import { Skill } from './skill';

export class User {

    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    birthday: Date;
    sex: boolean;
    address: string;
    starting_day: Date;
    skill: Skill;
    status: boolean;
    token: string;
}