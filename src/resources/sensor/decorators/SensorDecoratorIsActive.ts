import { ObjectDecorator } from '../../../ObjectDecorator';
import { Sensor } from '../Sensor';
import axios from 'axios';

export class SensorDecoratorIsActive implements ObjectDecorator<Sensor> {
    async decorate(object: Sensor): Promise<Sensor> {
        const value = await this.getState(object);
        object.isActivated = value;
        console.log("GET STATE");
        return new Promise((resolve) => {
            resolve(object);
        })
    }

    async digest(object: Sensor): Promise<Sensor> {
        //TODO: READ THE STATE OF THE SENSOR
        await this.setState(object);
        return new Promise((resolve) => {
            resolve(object);
        })
    }

    async setState(object: Sensor): Promise<boolean> {
        var value = 0;
        var currentValue = false;
        object.isActivated ? value = 1 : value = 0;

        try {
            const response = await axios.get('http://192.168.0.177:8099/led/' + value);
            let data = parseInt(response.data);
            if (data == 1) {
                currentValue = true;
            } else if (data == 0) {
                currentValue = false;
            }
            console.log(response);
        } catch (error) {
            currentValue = false
        }

        return new Promise((resolve) => {
            resolve(currentValue);
        })
    }
    // async setState(object:Sensor): Promise<boolean> {

    //     RESPONSE HIGH
    //     http://192.168.0.177:8099/led/1
    // } 

    async getState(object: Sensor): Promise<boolean> {
        var isActive = false;
        console.log("GET STATE");
        try {
            const instance = axios.create({
                timeout: 3000
            });
            const response = await instance.get('http://192.168.0.177:8099/status/');
            let value = parseInt(response.data);
            if (value == 1) {
                isActive = true;
            } else if (value == 0) {
                isActive = false;
            }
            console.log(response);
        } catch (error) {
            isActive = false
        }

        return new Promise((resolve) => {
            resolve(isActive);
        })
    }
}