import { User } from './user';

export interface DayOff{
    id: number;
    createAt: Date;
    dayStartOff: Date;
    dayEndOff: Date;
    description: string
    userEntity: User[];
}

    