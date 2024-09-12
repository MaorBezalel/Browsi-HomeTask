import express from 'express';
import cors from 'cors';
import publishersRouter from './routers/publishers.js';
import domainsRouter from './routers/domains.js';
import { getAllPublishersFromDB } from './utils/helpers.js';

const PORT = 4300;
const app = express();

export const publishers = getAllPublishersFromDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/publishers', publishersRouter);
app.use('/api/domains', domainsRouter);

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
