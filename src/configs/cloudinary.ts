import { config } from './config';
import {v2 as cloudinary} from 'cloudinary';

          
cloudinary.config({ 
  cloud_name: config.cloudinaryCloud, 
  api_key: config.cloudinaryAPI, 
  api_secret: config.cloudinarySecret 
});

export default cloudinary;
