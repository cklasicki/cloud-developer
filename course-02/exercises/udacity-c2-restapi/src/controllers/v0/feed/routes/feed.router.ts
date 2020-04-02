import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

const router: Router = Router();

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({ order: [['id', 'DESC']] });

    items.rows.forEach((item) => {
        if (item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });
    res.send(items);
});

//@TODO
//Add an endpoint to GET a specific resource by Primary Key
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const feed = await FeedItem.findByPk(id);
    if (!feed) {
        return res.status(404).send({ message: `No feed with id=${id} has been found!` });
    }
    return res.status(200).send(feed);
});

// update a specific resource
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
    //@TODO try it yourself
    const { id } = req.params;
    console.log(id);

    if (!id) {
        res.status(404).send({ message: 'ID parameter is mandatory in update' });
    }

    const { caption, url } = req.body;
    const [updatedRowsCount, updatedRows] = await FeedItem.update(
        { caption: caption, url: url },
        {
            where: { id: id },
            returning: true
        });

    if (updatedRowsCount === 0) {
        // no rows were updated
        res.status(200).send({ message: 'No rows were updated' });
    }

    res.status(201).send(updatedRows[0]);

});

// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
    requireAuth,
    async (req: Request, res: Response) => {
        console.log('put ...');
        let { fileName } = req.params;
        const url = AWS.getPutSignedUrl(fileName);
        res.status(201).send({ url: url });
    });

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/',
    requireAuth,
    async (req: Request, res: Response) => {
        const caption = req.body.caption;
        const fileName = req.body.url;

        // check Caption is valid
        if (!caption) {
            return res.status(400).send({ message: 'Caption is required or malformed' });
        }

        // check Filename is valid
        if (!fileName) {
            return res.status(400).send({ message: 'File url is required' });
        }

        const item = new FeedItem({
            caption: caption,
            url: fileName
        });

        const saved_item = await item.save();

        saved_item.url = AWS.getGetSignedUrl(saved_item.url);
        res.status(201).send(saved_item);
    });

export const FeedRouter: Router = router;