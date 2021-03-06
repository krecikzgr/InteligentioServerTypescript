import "reflect-metadata";
import { ApiServer } from './App'
import { DatabaseProvider } from './utilities/Database';

// DatabaseProvider.configure({
//     type: process.env.DATABASE_TYPE as any || 'postgres',
//     database: process.env.DATABASE_NAME || 'inteligentio',
//     username: process.env.DATABASE_USERNAME || 'adrian',
//     password: process.env.DATABASE_PASSWORD || 'adrian',
//     host: process.env.DATABASE_HOST || 'localhost',
//     port: +process.env.DATABASE_PORT || 5432,
//     ssl: !!process.env.USE_SSL
// });

DatabaseProvider.configure({
    type: process.env.DATABASE_TYPE as any || 'postgres',
    database: process.env.DATABASE_NAME || 'inteligentio2',
    username: process.env.DATABASE_USERNAME || 'admin',
    password: process.env.DATABASE_PASSWORD || 'admin',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    ssl: !!process.env.USE_SSL,
    synchronize: true
});

const app = new ApiServer()
app.start(3001)
