import { SignUpData } from "../models/auth";

export class AuthApiClient {
    static signIn() {

    }

    static signUp (signUpData: SignUpData) {
        console.log("api signup");
        return {};
    }
}