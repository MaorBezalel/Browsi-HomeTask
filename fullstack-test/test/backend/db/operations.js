import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const pathToDBJsonFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'db.json');

export const readDataFromDB = () => {
    try {
        const data = fs.readFileSync(pathToDBJsonFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the JSON file:', error);
        return [];
    }
};

export const writeDataToDB = (data) => {
    try {
        fs.writeFileSync(pathToDBJsonFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing to the JSON file:', error);
    }
};
