import { DatabaseProvider } from '../../utilities/Database';
import { Sensor } from "./Sensor";
import { Room } from "../room/Room";
import { ObjectService } from "../ObjectService";
import { SensorDecoratorIsActive } from './decorators/SensorDecoratorIsActive';





export class SensorService extends ObjectService<Sensor>{

    registerDecorators() {
        this.decoratorService.addDecorator(new SensorDecoratorIsActive());
    }

    public async create(roomId: number, setting: Sensor): Promise<Sensor> {
        let newObject = new Sensor();
        newObject = setting;
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Sensor).save(newObject);

        // const connection = await DatabaseProvider.getConnection();

        // const newObject = new Sensor();
        // newObject.isActive = setting.isActive;
        // newObject.name = setting.name;
        // newObject.description = setting.description;

        // const room = await connection.getRepository(Room).findOne(roomId);
        // if (!room) {
        //     return
        // }
        // newObject.room = room;
        // return await connection.getRepository(Sensor).save(newObject);
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

    public async update(id: number, sensor: Sensor): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Sensor)
        const oldObject = await repository.findOne(id);
        await repository.merge(oldObject, sensor);
        await repository.save(oldObject);
        return this.decoratorService.digest(oldObject);
    }
}

export const sensorService = new SensorService();