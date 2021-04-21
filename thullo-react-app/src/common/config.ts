import { env } from "process";

const config = {
    apiUrl: "http://nikitabortnikov-001-site1.ctempurl.com/api",
};

if (env.NODE_ENV === 'development') {
    config.apiUrl = "http://localhost:5000";
}

export default config;