import { readDataFromDB, writeDataToDB } from '../db/operations.js';
import { publishers } from '../server.js';

export const getAllPublishersFromDB = () => {
    return readDataFromDB();
};

export const addNewPublisherToDB = (nameOfNewPublisher) => {
    const newPublisher = {
        publisher: nameOfNewPublisher,
        domains: [],
    };

    try {
        publishers.unshift(newPublisher);
        writeDataToDB(publishers);
        return newPublisher;
    } catch (error) {
        console.error('Error adding new publisher:', error);
        return null;
    }
};

export const deletePublisherFromDB = (publisherName) => {
    const publisherIndex = publishers.findIndex(
        (existsPublisher) => existsPublisher.publisher.toLowerCase() === publisherName
    );

    try {
        const [deletedPublisher] = publishers.splice(publisherIndex, 1);
        writeDataToDB(publishers);
        return deletedPublisher;
    } catch {
        console.error('Error deleting publisher:', error);
        return null;
    }
};
