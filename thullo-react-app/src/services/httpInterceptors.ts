import { AxiosRequestConfig, AxiosResponse } from "axios";

import { constants } from "../common/data";

export function requestInterceptor (req: AxiosRequestConfig) {
    const token = localStorage.getItem(constants.localStorageTokenKey);
    
    if (token) {
        req.headers["Authorization"] = "Bearer " + token;
    }

    console.log("sending request to ", req.url);
    return req;
}

export function responseInterceptor (res: AxiosResponse<any>) {
    console.log("response from " + res.request.responseURL + " with status " + res.status);
    return res;
}

export function responseErrorInterceptor (err: any) {
    console.log("response error", err);

    if (err.response && err.response.data && err.response.data.errors) {
        return Promise.resolve(err.response);
    } else if (err.response && err.response.statusText) {
        return Promise.resolve({ data: { errors: [err.response.statusText] } });
    } else if (err.message) {
        return Promise.resolve({ data: { errors: [err.message] } });
    } else {
        return Promise.resolve({ data: { errors: ["Unknown error"] } });
    }
}