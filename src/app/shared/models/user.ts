import { Skill } from './skill';

export class User {
    id: number;
    idUser: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    avatarBase64: string
    birthday: Date;
    sex: boolean;
    address: string;
    starting_day: Date;
    skill: Skill;
    status: boolean;
    token: string;
    enable: boolean
}