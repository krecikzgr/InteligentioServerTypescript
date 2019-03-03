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
        return await Promise.all(localObjects.map(async (localObject) => {
            return await this.decoratorService.decorate(localObject);
        }));
    }

    public async update(id: number, object: Sensor): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Sensor)
        const oldObject = await repository.findOne(id);
        await repository.merge(oldObject, object);
        await repository.save(oldObject);
        return this.decoratorService.digest(oldObject);
    }

    public async delete(id:number) {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Sensor);
        repository.delete(id);
    }
}

export const sensorService = new SensorService();