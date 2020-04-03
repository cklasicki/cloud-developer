import AWS = require('aws-sdk');
import { config } from './config/config';
import { constants } from './constants';

const c = config.dev;

console.log(c);

const getObjectCommand = constants.s3.commands.get;
const putObjectCommand = constants.s3.commands.put;

//Configure AWS

if (c.aws_profile !== "DEPLOYED") {
  var credentials = new AWS.SharedIniFileCredentials({ profile: c.aws_profile });
  AWS.config.credentials = credentials;
}

export const s3 = new AWS.S3({
  signatureVersion: constants.s3.signatureVersion,
  region: c.aws_s3_region,
  params: { Bucket: c.aws_media_bucket }
});


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl(key: string): string {
  return getSignedUrlInternal(getObjectCommand, key);
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl(key: string) {
  return getSignedUrlInternal(putObjectCommand, key);
}

/* getSignedUrlInternal common functionality for managing bucket */

function getSignedUrlInternal(command: string, key: string) {

  const signedUrlExpireSeconds = 60 * 5

  const url = s3.getSignedUrl(command, {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds
  });

  return url;
}
