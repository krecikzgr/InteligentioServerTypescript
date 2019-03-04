import { ObjectDecorator } from '../../../ObjectDecorator';
import { Sensor } from '../Sensor';

export class SensorDecoratorIsActive implements ObjectDecorator<Sensor> {
    decorate(object: Sensor): Promise<Sensor> {
        //object.isActive = true;
        return new Promise((resolve) => {
            resolve(object);
        })
    }

    digest(object: Sensor): Promise<Sensor> {
        //TODO: READ THE STATE OF THE SENSOR
        return new Promise((resolve) => {
            resolve(object);
        })
    }
}