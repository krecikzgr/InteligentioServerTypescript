import {ObjectDecorator, DecoratorService} from '../../../ObjectDecorator';
import {Room} from '../Room';

export class RoomDecoratorService implements DecoratorService<Room> {
    decorators:ObjectDecorator<Room>[];

    decorate(object:Room):Promise<Room> {
        var room = object;
        this.decorators.forEach( async (decorator)=> {
            room = await decorator.decorate(room);
        })
        return new Promise((resolve)=> {
            resolve(room);
        })
    }
}