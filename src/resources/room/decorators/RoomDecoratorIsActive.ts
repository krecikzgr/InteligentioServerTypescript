import { ObjectDecorator } from '../../../ObjectDecorator';
import { Room } from '../Room';
import { sensorService } from '../../sensor/SensorService';
import { roomService } from '../RoomService';


export class RoomDecoratorIsActive implements ObjectDecorator<Room> {
    async decorate(object: Room): Promise<Room> {
        console.log("BEGIN DECORATION");
        const localObject = object;
        const sensors = await sensorService.listForRoom(object.id)
        //TEN ASYNC SIĘ SYPIE
        console.log("SENSOR SERVICE LIST FOR ROOM " + sensors.length)
        const activeSensors = sensors.filter(sensor=>sensor.isActive)
        if(activeSensors.length > 0) {
            localObject.isActive = true
        } else {
            localObject.isActive = false
        }
        console.log("END DECORATION")
        return localObject;
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