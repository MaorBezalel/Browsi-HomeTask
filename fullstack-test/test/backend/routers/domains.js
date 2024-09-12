import express from 'express';
import { publishers } from '../server.js';

const domainsRouter = express.Router();

domainsRouter.get('/:publisherName', (req, res) => {
    const publisherName = req.params.publisherName;
    const publisher = publishers.find(
        (existsPublisher) => existsPublisher.publisher.toLowerCase() === publisherName.toLowerCase()
    );

    if (!publisher) {
        return res.status(400).json({ errorMessage: 'Publisher not found' });
    }

    return res.status(200).json(publisher.domains);
});

export default domainsRouter;
