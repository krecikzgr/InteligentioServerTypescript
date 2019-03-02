import { Room } from "./Room";
import { DatabaseProvider } from '../../utilities/Database';
import { sensorService } from '../sensor/SensorService';
import { RoomDecoratorIsActive } from "./decorators/RoomDecoratorIsActive";
import { ObjectService } from "../ObjectService";



export class RoomService extends ObjectService<Room> {

    registerDecorators() {
        this.decoratorService.addDecorator(new RoomDecoratorIsActive())
    }

    public async create(scene: Room): Promise<Room> {
        // Normally DTO !== DB-Entity, so we "simulate" a mapping of both
        var newObject = new Room();
        newObject = scene;
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Room).save(newObject);
    }

    public async list(): Promise<Room[]> {
        const connection = await DatabaseProvider.getConnection();
        const rooms = await connection.getRepository(Room).find();
        return await Promise.all(rooms.map(async (room) => {
            return await this.decoratorService.decorate(room);
        }));
    }
}

export const roomService = new RoomService();