import { config } from '../../../../config/config';

const c = config.dev.image_endpoint.remote;

export function buildFetchUrl(url: string): string {

    let port = c.port;
    if (port === undefined) {
        port = ""
    }
    else {
        port = `:${port}`
    }

    return encodeURI(`${c.protocol}://${c.host}${port}/filteredimage?image_url=${url}`);
}