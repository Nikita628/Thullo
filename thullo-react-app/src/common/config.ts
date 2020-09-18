const config = {
    apiUrl: "http://localhost:5000/api",
};

switch (process.env.NODE_ENV) {
    case "production":
        config.apiUrl = "";
        break;
    default:
        break;
}

export default config;