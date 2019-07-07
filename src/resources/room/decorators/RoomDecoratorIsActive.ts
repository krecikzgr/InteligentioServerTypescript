import { ObjectDecorator } from '../../../ObjectDecorator';
import { Room } from '../Room';
import { sensorService } from '../../sensor/SensorService';;


export class RoomDecoratorIsActive implements ObjectDecorator<Room> {
    async decorate(object: Room): Promise<Room> {
        const localObject = object;
        const sensors = await sensorService.listForRoom(object.id)
        const activeSensors = sensors.filter(sensor => sensor.isActive)
        if (activeSensors.length > 0) {
            localObject.isActive = true
        } else {
            localObject.isActive = false
        }
        return localObject;
    }

    async digest(object: Room): Promise<Room> {
        let localObject = object;
        const sensors = await sensorService.listForRoom(object.id)
        await Promise.all(sensors.map(async (sensor) => {
            sensor.isActive = object.isActive;
            await sensorService.update(sensor.id, sensor);
        }));
        return localObject;
    }
}