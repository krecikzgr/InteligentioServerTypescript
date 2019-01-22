import {DatabaseProvider} from '../../utilities/Database';
import { Sensor } from "./Sensor";
import { Room } from "../room/Room";

export class SensorService {
    public async create(roomId:number,setting: Sensor): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();

        const newObject = new Sensor();
        newObject.isActive = setting.isActive;
        newObject.name = setting.name;
        newObject.description = setting.description;

        const room = await connection.getRepository(Room).findOne(roomId);
        if (!room) {
            return
        }
        newObject.room = room;
        return await connection.getRepository(Sensor).save(newObject);    
    }

    public async getById(id:number): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Sensor).findOne(id);
    }

    public async list(): Promise<Sensor[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Sensor).find();
    }

    public async activate(id:number, isActive:boolean): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();
        const sensor = await connection.getRepository(Sensor).findOne(id);
        sensor.isActive = isActive;
        return await connection.getRepository(Sensor).save(sensor);
    }

}

export const sensorService = new SensorService();