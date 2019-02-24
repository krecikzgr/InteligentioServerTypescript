import {ObjectDecorator, DecoratorService} from '../../../ObjectDecorator';
import {Room} from '../Room';
import {RoomDecoratorIsActive} from './RoomDecoratorIsActive';


export class RoomDecoratorService implements DecoratorService<Room> {
    decorators:ObjectDecorator<Room>[];

    constructor() {
        this.decorators = []
        this.decorators.push( new RoomDecoratorIsActive() );
    }

    decorate(object:Room):Promise<Room> {
        var room = object;
        this.decorators.forEach( async (decorator)=> {
            room = await decorator.decorate(room);
        })
        return new Promise((resolve)=> {
            resolve(room);
        })
    }

    digest(object:Room): Promise<Room> {
        var room = object;
        this.decorators.forEach( async (decorator)=> {
            room = await decorator.digest(room);
        })
        return new Promise((resolve)=> {
            resolve(room);
        })
    }
}
export const roomDecoratorService = new RoomDecoratorService();