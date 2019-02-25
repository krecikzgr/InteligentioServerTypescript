import { ObjectDecorator, DecoratorService } from '../../../ObjectDecorator';
import { Sensor } from '../Sensor';
import { SensorDecoratorIsActive} from './SensorDecoratorIsActive';

export class SensorDecoratorService implements DecoratorService<Sensor> {
    decorators: ObjectDecorator<Sensor>[];

    constructor() {
        this.decorators = [];
        this.decorators.push(new SensorDecoratorIsActive());
    }

    decorate(object: Sensor): Promise<Sensor> {
        var localObject = object;
        this.decorators.forEach( async (decorator)=> {
            localObject = await decorator.decorate(localObject);
        })
        return new Promise((resolve)=> {
            resolve(localObject);
        })
    }
    digest(object: Sensor): Promise<Sensor> {
        var localObject = object;
        this.decorators.forEach( async (decorator)=> {
            localObject = await decorator.digest(localObject);
        })
        return new Promise((resolve)=> {
            resolve(localObject);
        })
    }
}

export const sensorDecoratorService = new SensorDecoratorService();