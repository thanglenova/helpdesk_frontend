import { User } from './user';
import { Status } from './status';

export interface DayOff{
    id: number;
    createAt: Date;
    dayStartOff: Date;
    dayEndOff: Date;
    description: string;
    user: User;
    status: Status;
}
export class DayOff {
  id: number;
  createAt: Date;
  dayStartOff: Date;
  dayEndOff: Date;
  description: string;
}
