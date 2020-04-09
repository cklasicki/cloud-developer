import { Router, Request, Response } from 'express';
import { requireAuth } from '../../users/routes/auth.router';
import fetch from 'node-fetch';
import { buildFetchUrl } from '../service/image.service';

const router: Router = Router();

// Endpoint with general usage
router.get('/', requireAuth, async (req: Request, res: Response) => {
    res.status(200).send('try GET /filterImage?image_url={{}}');
});

// Endpoint to retrieve the filtered image
router.get('/filterImage/', requireAuth, async (req: Request, res: Response) => {

    const { image_url } = req.query;

    const imageURL = buildFetchUrl(image_url);

    console.log(`ImageURL: ${imageURL}`);

    const response = await fetch(imageURL);

    if (response.status >= 400) {
        const errorMessage = await Promise.resolve(response.json());
        return res.status(response.status).send(errorMessage);
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());

    return res
        .status(response.status)
        .contentType('jpeg')
        .send(imageBuffer);

});

export const ImageRouter: Router = router;