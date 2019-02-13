import { Room } from "./Room";
import {DatabaseProvider} from '../../utilities/Database';
import {sensorService} from '../sensor/SensorService';
import {RoomDecoratorIsActive} from './decorators/RoomDecoratorIsActive';

export class RoomService {
    public async create(scene: Room): Promise<Room> {
        // Normally DTO !== DB-Entity, so we "simulate" a mapping of both
        const newObject = new Room();
        newObject.name = scene.name;
        newObject.description = scene.description;

        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Room).save(newObject);
    }

    public async list(): Promise<Room[]> {
        const connection = await DatabaseProvider.getConnection();
        const rooms = await connection.getRepository(Room).find();
        return await Promise.all(rooms.map( async (room) => {
            const decorator = new RoomDecoratorIsActive();
            return await decorator.decorate(room);
        }));
    }

    public async activate(id:number, isActive:boolean): Promise<Room> {
        const connection = await DatabaseProvider.getConnection();
        const room =  await connection.getRepository(Room).findOne(id);
        
        await Promise.all(room.sensors.map( async (sensor) => {
            sensorService.activate(sensor.id, isActive);
        }));
        return await connection.getRepository(Room).save(room);
    }
}

export const roomService = new RoomService();