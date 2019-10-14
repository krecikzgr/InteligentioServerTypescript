import { ObjectDecorator } from '../../../ObjectDecorator';
import { EspLightSwitch } from '../EspLightSwitch';
import axios from 'axios';

export class EspLightSwitchDecoratorIsActive implements ObjectDecorator<EspLightSwitch> {
    async decorate(object: EspLightSwitch): Promise<EspLightSwitch> {
        const value = await this.getState(object);
        object.isActive = value;
        return new Promise((resolve) => {
            resolve(object);
        })
    }

    async digest(object: EspLightSwitch): Promise<EspLightSwitch> {
        //TODO: READ THE STATE OF THE SENSOR
        await this.setState(object);
        return new Promise((resolve) => {
            resolve(object);
        })
    }

    async setState(object: EspLightSwitch): Promise<boolean> {
        var value = 0;
        var currentValue = false;
        object.isActive ? value = 1 : value = 0;

        try {
            const response = await axios.get(object.address + '/led/' + value);
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

    async getState(object: EspLightSwitch): Promise<boolean> {
        var isActive = false;
        console.log("REQUEST ADDRESS " + object.address + '/status/');
        try {
            const instance = axios.create({
                timeout: 3000
            });
            const response = await instance.get(object.address + '/status/');
            console.log("RESPONSE HTTP STATUS" + response.status.toString);
            console.log("BODY" + response.data.BODY);
            let value = parseInt(response.data);
            if (value == 1) {
                isActive = true;
            } else if (value == 0) {
                isActive = false;
            }
        } catch (error) {
            isActive = false
        }

        return new Promise((resolve) => {
            resolve(isActive);
        })
    }
}