import { ObjectDecorator } from '../../../ObjectDecorator';
import { Room } from '../Room';
import { sensorService } from '../../sensor/SensorService';


export class RoomDecoratorIsActive implements ObjectDecorator<Room> {
    decorate(object: Room): Promise<Room> {
        object.isActive = true;
        return new Promise((resolve) => {
            resolve(object);
        })
    }

    async digest(object: Room): Promise<Room> {
        //TODO: READ THE STATE OF ALLL SENSORS IN THE ROOM
        await Promise.all(object.sensors.map(async (sensor) => {
            sensor.isActive = object.isActive;
            sensorService.update(sensor.id, sensor);
        }));


        return new Promise((resolve) => {
            resolve(object);
        })
    }
}