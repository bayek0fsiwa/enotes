import { config as conf } from "dotenv";

// dotenv config init
conf()


const _config = {
    port: process.env.PORT,
    dbURL: process.env.MONGO_CONNECTION_STRING,
}


export const config = Object.freeze(_config);
