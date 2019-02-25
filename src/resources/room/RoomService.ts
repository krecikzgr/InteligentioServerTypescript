import { Room } from "./Room";
import { DatabaseProvider } from '../../utilities/Database';
import { sensorService } from '../sensor/SensorService';
import { roomDecoratorService } from './decorators/RoomDecoratorService';
import { DecoratorService } from "../../ObjectDecorator";
import { runInThisContext } from "vm";


export class ObjectService<T> {
    decoratorService: DecoratorService<T>;

    constructor() {
        this.decoratorService = new DecoratorService<T>();
    }

    public async list(): Promise<T[]> {
        const connection = await DatabaseProvider.getConnection();
        //How to pass a class Name as a variable
        const objects = await connection.getRepository(T).find();
        return await Promise.all(objects.map(async (object) => {
            return await this.decoratorService.decorate(object);
        }));
    }
}

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
        return await Promise.all(rooms.map(async (room) => {
            return await roomDecoratorService.decorate(room);
        }));
    }

    public async activate(id: number, isActive: boolean): Promise<Room> {
        const connection = await DatabaseProvider.getConnection();
        const room = await connection.getRepository(Room).findOne(id);

        await Promise.all(room.sensors.map(async (sensor) => {
            sensorService.activate(sensor.id, isActive);
        }));
        return await connection.getRepository(Room).save(room);
    }
}

export const roomService = new RoomService();