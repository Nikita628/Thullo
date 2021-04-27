import { env } from "process";

const config = {
    apiUrl: "https://nikbthullo.azurewebsites.net/api",
};

if (env.NODE_ENV === 'development') {
    config.apiUrl = "http://localhost:5000/api";
}

export default config;