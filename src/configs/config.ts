import { config as conf } from "dotenv";

// dotenv config init
conf()


const _config = {
    port: process.env.PORT,
    dbURL: process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
<<<<<<< HEAD
    cloudinaryApiKey: process.env.CLOUDINARY_API,
=======
    cloudinaryAPI: process.env.CLOUDINARY_API,
>>>>>>> 255d6bbc85a4a491c827fc3df54283af2a24ebd5
    cloudinarySecret: process.env.CLOUDINARY_SECRET,
}


export const config = Object.freeze(_config);
