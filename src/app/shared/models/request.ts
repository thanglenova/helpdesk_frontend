import { RequestType } from "./requestType";
import { Profile } from "./profile";
import { Status } from "./status";
export class Request {
  id: number;
  dayRequest: Date;
  createAt: Date;
  description: Date;
  requestType: RequestType;
  user: Profile;
  status: Status;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
