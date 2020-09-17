import { User } from "./user";

export class SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    img: File;
}

export class SignInData {
    login: string;
    password: string;
}

export class SignInResult {
    token: string;
    user: User;
}