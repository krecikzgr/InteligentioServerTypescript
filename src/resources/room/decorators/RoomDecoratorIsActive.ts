import {ObjectDecorator} from '../../../ObjectDecorator';
import {Room} from '../Room';

export class RoomDecoratorIsActive implements ObjectDecorator<Room> {
    decorate(object:Room):Promise<Room> {
        object.isActive = true;
        return new Promise((resolve)=> {
            resolve(object);
        })
    }

    digest(object:Room): Promise<Room> {
        //TODO: READ THE STATE OF ALLL SENSORS IN THE ROOM
        return new Promise((resolve)=> {
            resolve(object);
        }) 
    }
}