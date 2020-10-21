import axios from "axios";
import { SignInData, SignInResult, SignUpData } from "../../models/auth";
import { ApiResponse } from "../../models/common";
import config from "../../common/config";

export class AuthApiClient {
    static signIn(signInData: SignInData) {
        return axios.post<ApiResponse<SignInResult>>(`${config.apiUrl}/auth/signIn`, signInData);
    }

    static signUp (signUpData: SignUpData) {
        const form = new FormData();
        form.append("userImg", signUpData.img);
        signUpData.img = null;
        form.append("signUpDataJson", JSON.stringify(signUpData));
        return axios.post<ApiResponse<boolean>>(`${config.apiUrl}/auth/signUp`, form);
    }
}