import { Skill } from './skill';
export class Profile{
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    age : number;
    birthday : Date;
    sex : boolean;
    address : string;
    startingDay : string;
    avatarBase64 : string;
    fileUpload : File;
    skills : Skill[];

    constructor(profile : Profile){
        this.sex = profile.sex;
        this.skills = profile.skills;
        this.startingDay = profile.startingDay;
        this.address = profile.address;
        this.age = profile.age;
        this.avatarBase64 = profile.avatarBase64;
        this.birthday = profile.birthday;
        this.email = profile.email;
        this.firstName = profile.firstName;
        this.id = profile.id;
        this.lastName = profile.lastName;
    }
}