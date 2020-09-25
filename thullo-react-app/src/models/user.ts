import { ApiPageRequest, File } from "./common";

export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    img: File;

    static getInitials(user: User) {
        return user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
    }

    static getFullName(user: User) {
        return user.firstName + " " + user.lastName;
    }
}

export class UserSearchParam extends ApiPageRequest {
    nameOrEmailContains: string;
}