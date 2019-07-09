import { ObjectDecorator } from '../../../ObjectDecorator';
import { Room } from '../Room';
import { espLightSwitchService } from '../../espLightSwitch/EspLightSwitchService';


export class RoomDecoratorIsActive implements ObjectDecorator<Room> {
    async decorate(object: Room): Promise<Room> {
        const localObject = object;
        const sensors = await espLightSwitchService.listForRoom(object.id)
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
        const sensors = await espLightSwitchService.listForRoom(object.id)
        await Promise.all(sensors.map(async (sensor) => {
            sensor.isActive = object.isActive;
            await espLightSwitchService.update(sensor.id, sensor);
        }));
        return localObject;
    }
}