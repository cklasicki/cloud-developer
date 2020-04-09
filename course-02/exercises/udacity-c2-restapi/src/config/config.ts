import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const envConf = dotenv.parse(fs.readFileSync('dev.env'));

for (const k in envConf) {
  process.env[k] = envConf[k];
}

export const config = {
  "dev": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_SCHEMA,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "aws_region": process.env.DB_REGION,
    "aws_s3_region": process.env.S3_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.S3_BUCKET,
    "aws_jwt_secret": process.env.AWS_JWT_SECRET,
    "image_endpoint": {
      "local": {
        "protocol": "http",
        "host": "localhost",
        "port": 8082
      },
      "remote": {
        "protocol": process.env.IMAGE_PROTOCOL || "http",
        "host": process.env.IMAGE_HOST || "image.udagram.fun",
        "port": process.env.IMAGE_PORT || 0
      }
    }
  }
}
