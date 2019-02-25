import { DatabaseProvider } from '../../utilities/Database';
import { Sensor } from "./Sensor";
import { Room } from "../room/Room";
import { sensorDecoratorService } from "./decorators/SensorDecoratorService";

export class SensorService {
    public async create(roomId: number, setting: Sensor): Promise<Sensor> {
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

    public async getById(id: number): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Sensor).findOne(id);
    }

    public async list(): Promise<Sensor[]> {
        const connection = await DatabaseProvider.getConnection();
        const localObjects = await connection.getRepository(Sensor).find();
        return await Promise.all(localObjects.map( async (localObject) => {
            return await sensorDecoratorService.decorate(localObject);
        }));
    }
    //TODO: Move functionality to patch and update

    public async activate(id: number, isActive: boolean): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();
        const sensor = await connection.getRepository(Sensor).findOne(id);
        return await connection.getRepository(Sensor).save(sensor);
    }

    public async update(id: number, sensor: Sensor): Promise<Sensor> {
        const connection = await DatabaseProvider.getConnection();
        const oldSensor = await connection.getRepository(Sensor).findOne(id);
        if (!oldSensor) {
            return
        }
        oldSensor.description = sensor.description;
        oldSensor.name = sensor.name;
        const room = await connection.getRepository(Room).findOne(sensor.roomId);
        if (!room) {
            return await connection.getRepository(Sensor).save(oldSensor);
        }
        oldSensor.room = room;
        room.sensors.push(oldSensor);
        await connection.getRepository(Room).save(room);
        return await connection.getRepository(Sensor).save(oldSensor);
    }
}

export const sensorService = new SensorService();