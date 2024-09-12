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
        writeDataToDB([newPublisher, ...publishers]); // we first try to write to the db.json file before updating the publishers array
        publishers.unshift(newPublisher); // since the write to the db.json file was successful, we can now update the publishers array
        return newPublisher;
    } catch (error) {
        console.error('Error adding new publisher:', error);
        return null;
    }
};
