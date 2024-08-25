<<<<<<< HEAD
import { v2 as cloudinary } from "cloudinary";
import { config } from "./config"

cloudinary.config({
    cloud_name: config.cloudinaryCloud,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinarySecret,
=======
import { config } from './config';
import {v2 as cloudinary} from 'cloudinary';

          
cloudinary.config({ 
  cloud_name: config.cloudinaryCloud, 
  api_key: config.cloudinaryAPI, 
  api_secret: config.cloudinarySecret 
>>>>>>> 255d6bbc85a4a491c827fc3df54283af2a24ebd5
});

export default cloudinary;
