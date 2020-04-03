export const config = {
  "debug": {
    "username": "udagramczarekdev",
    "password": "udagramczarekdev",
    "database": "udagramczarekdev",
    "host": "udagramczarekdev.co1x4xeosg2t.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_s3_region": "eu-central-1",
    "aws_media_bucket": "udagrammediadev",
    "aws_profile": "default"
  },
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
    "aws_jwt_secret" : process.env.AWS_JWT_SECRET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
