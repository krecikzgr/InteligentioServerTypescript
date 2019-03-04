import { Room } from "./Room";
import { DatabaseProvider } from '../../utilities/Database';
import { RoomDecoratorIsActive } from "./decorators/RoomDecoratorIsActive";
import { ObjectService } from "../ObjectService";



export class RoomService extends ObjectService<Room> {

    registerDecorators() {
        this.decoratorService.addDecorator(new RoomDecoratorIsActive())
    }

    public async create(object: Room): Promise<Room> {
        let newObject = new Room();
        newObject = object;
        const connection = await DatabaseProvider.getConnection();
        await connection.getRepository(Room).save(newObject);
        return this.decoratorService.digest(newObject);
    }

    public async getById(id: number): Promise<Room> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Room).findOne(id);
    }

    public async list(): Promise<Room[]> {
        const connection = await DatabaseProvider.getConnection();
        const localObjects = await connection.getRepository(Room).find();
        let pushedObjects = []
        await Promise.all(localObjects.map(async (localObject) => {
            const decoratedObject = await this.decoratorService.decorate(localObject);
            pushedObjects.push(decoratedObject)
        }));
        return pushedObjects;
    }

    public async update(id: number, object: Room): Promise<Room> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Room)
        let oldObject = await repository.findOne(id);
        object = await this.decoratorService.digest(object);
        await repository.merge(oldObject, object);
        await repository.save(oldObject);
        oldObject = await this.decoratorService.decorate(oldObject);
        return oldObject
    }

    public async delete(id: number) {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Room);
        repository.delete(id);
    }
}

export const roomService = new RoomService();