import { ApiPageRequest, File } from "./common";

export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    img: File;
}

export class UserSearchParam extends ApiPageRequest {
    nameOrEmailContains: string;
}