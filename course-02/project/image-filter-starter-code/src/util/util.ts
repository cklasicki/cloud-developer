import fs from 'fs';
import Jimp = require('jimp');
import validUrl from 'valid-url';
import { reject } from 'bluebird';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export function filterImageFromURL(inputURL: string): Promise<string> {
    return new Promise((resolve,reject) => {
        Jimp.read(inputURL)
            .then(photo => {
                const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
                photo
                    .resize(256, 256) // resize
                    .quality(60) // set JPEG quality
                    .greyscale() // set greyscale
                    .write(__dirname + outpath, (img) => {
                        resolve(__dirname + outpath);
                    });
            })
            .catch(error => {
                console.log("Error caught in filterImagefromURL: ", error.message);
                // throw new Error("Could not parse provided file");
                // throw error;
            })
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
    for (let file of files) {
        try {
            fs.unlinkSync(file);
        } catch (err) {
            console.log(`Could not delete resource on fs. Error: ${err}`);
        }
    }
}

export function urlNotValid(url: string): boolean {
    return !validUrl.isWebUri(url) || !isPictureExtension(url);
}

export function isPictureExtension(url: string): boolean {

    const suffixes = ['.jpg', '.jpeg', '.png'];

    const found = suffixes.find(s => {
        return url.endsWith(s);
    });
    return found !== undefined;
}