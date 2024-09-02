import { initMongoCollection } from './db/initMongoCollection.js';
import { startServer } from './server.js';

const bootstrap = async () => {
    await initMongoCollection();
    startServer();
};

bootstrap();