import { DatabaseProvider } from '../../utilities/Database';
import { Sensor } from "./Sensor";
import { ObjectService } from "../ObjectService";
import { SensorDecoratorIsActive } from './decorators/SensorDecoratorIsActive';

export class SensorService extends ObjectService<Sensor>{

    registerDecorators() {
        this.decoratorService.addDecorator(new SensorDecoratorIsActive());
    }

    public async create(object:Sensor): Promise<Sensor> {
        let newObject = new Sensor();
        newObject = object;
        const connection = await DatabaseProvider.getConnection();
        await connection.getRepository(Sensor).save(newObject);
        return this.decoratorService.digest(newObject);
    }

    public async getById(id: number): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Sensor).findOne(id);
    }

    public async list(): Promise<Sensor[]> {
        const connection = await DatabaseProvider.getConnection();
        const localObjects = await connection.getRepository(Sensor).find();
        let pushedObjects = []
        await Promise.all(localObjects.map(async (localObject) => {
            const decoratedObject = await this.decoratorService.decorate(localObject);
            pushedObjects.push(decoratedObject)
        }));
        return pushedObjects;
    }

    public async update(id: number, object: Sensor): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Sensor)
        let oldObject = await repository.findOne(id);
        object = await this.decoratorService.digest(object);
        await repository.merge(oldObject, object);
        await repository.save(oldObject);
        oldObject = await this.decoratorService.decorate(oldObject);
        return oldObject
    }

    public async listForRoom(roomId:number): Promise<Sensor[]> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Sensor)
        const localObjects = await repository.find({ where: { roomId: roomId }});
        let decoratedObjects = []
        await Promise.all(localObjects.map(async (localObject) => {
            const decoratedObject = await this.decoratorService.decorate(localObject);
            decoratedObjects.push(decoratedObject);
        }));
        return decoratedObjects
    }

    public async delete(id:number) {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Sensor);
        repository.delete(id);
    }
}

export const sensorService = new SensorService();