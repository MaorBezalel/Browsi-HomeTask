import express from 'express';
import { publishers } from '../server.js';
import { addNewPublisherToDB } from '../utils/helpers.js';

const publishersRouter = express.Router();

publishersRouter.get('/', (req, res) => {
    res.status(200).json(publishers);
});

publishersRouter.get('/:publisherName', (req, res) => {
    const publisherName = req.params.publisherName;
    const publisher = publishers.find(
        (existsPublisher) => existsPublisher.publisher.toLowerCase() === publisherName.toLowerCase()
    );

    if (!publisher) {
        return res.status(400).json({ errorMessage: 'Publisher not found' });
    }

    return res.status(200).json(publisher);
});

publishersRouter.post('/', (req, res) => {
    const publisherName = req.body.publisher;
    const publisher = publishers.find(
        (existsPublisher) => existsPublisher.publisher.toLowerCase() === publisherName.toLowerCase()
    );

    if (publisher) {
        return res.status(400).json({ errorMessage: 'The publisher already exist' });
    }

    const newPublisher = {
        publisher: publisherName,
        domains: [],
    };

    const addedPublisher = addNewPublisherToDB(publisherName);
    if (addedPublisher) {
        res.status(201).json(newPublisher);
    } else {
        res.status(500).json({
            errorMessage: 'Internal error while trying to add a new publisher. Please try again later',
        });
    }
});

publishersRouter.delete('/:publisherName', (req, res) => {
    const publisherName = req.params.publisherName;
    const publisherIndex = publishers.findIndex(
        (existsPublisher) => existsPublisher.publisher.toLowerCase() === publisherName
    );

    if (publisherIndex !== -1) {
        const [deletedPublisher] = publishers.splice(publisherIndex, 1);
        return res.status(201).json(deletedPublisher);
    } else {
        return res.status(400).json({ errorMessage: 'Publisher not found' });
    }
});

export default publishersRouter;
