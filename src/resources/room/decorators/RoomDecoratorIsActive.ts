import {ObjectDecorator} from '../../../ObjectDecorator';
import {Room} from '../Room';

export class RoomDecoratorIsActive implements ObjectDecorator<Room> {
    decorate(object:Room):Promise<Room> {
        object.isActive = true;
        return new Promise((resolve)=> {
            resolve(object);
        })
    }
}