import { Connection, createConnection } from 'typeorm';
import { Scene } from "../resources/scene/Scene";
import { SceneSetting } from '../resources/sceneSetting/SceneSetting';
import { Room } from '../resources/room/Room';
import { EspLightSwitch } from '../resources/espLightSwitch/EspLightSwitch';

export interface DatabaseConfiguration {
    type: 'postgres' | 'mysql' | 'mssql';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
    synchronize: boolean;
}

export class DatabaseProvider {
    private static connection: Connection;
    private static configuration: DatabaseConfiguration;

    public static configure(databaseConfiguration: DatabaseConfiguration): void {
        DatabaseProvider.configuration = databaseConfiguration;
    }

    public static async getConnection(): Promise<Connection> {
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection;
        }

        if (!DatabaseProvider.configuration) {
            throw new Error('DatabaseProvider is not configured yet.');
        }

        const { type, host, port, username, password, database, ssl, synchronize } = DatabaseProvider.configuration;
        DatabaseProvider.connection = await createConnection({
            type, host, port, username, password, database, synchronize,
            extra: {
                ssl
            },
            entities: [
                Room,
                Scene,
                SceneSetting,
                EspLightSwitch
            ],
        } as any); // as any to prevent complaining about the object does not fit to MongoConfiguration, which we won't use here
        return DatabaseProvider.connection;
    }
}
