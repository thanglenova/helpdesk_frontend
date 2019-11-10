
import {RequestType} from './request-type';
import { User } from './user';
import { Status } from './status';

export class Request{
    id: number;
    requestType: RequestType;
    user : User;
    status : Status;
    dayRequest : Date;
    createAt: Date;
    description : string; 
}