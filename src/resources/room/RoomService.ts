import { Room } from "./Room";
import {DatabaseProvider} from '../../utilities/Database';

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
        return await connection.getRepository(Room).find();
    }

}

export const roomService = new RoomService();