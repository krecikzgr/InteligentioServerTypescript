import { ObjectDecorator } from '../../../ObjectDecorator';
import { Sensor } from '../Sensor';

export class SensorDecoratorIsActive implements ObjectDecorator<Sensor> {
    async decorate(object: Sensor): Promise<Sensor> {
        //object.isActive = true;
        return new Promise((resolve) => {
            resolve(object);
        })
    }

    async digest(object: Sensor): Promise<Sensor> {
        //TODO: READ THE STATE OF THE SENSOR
        return new Promise((resolve) => {
            resolve(object);
        })
    }
}