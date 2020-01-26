import { ObjectDecorator } from '../../../ObjectDecorator';
import { EspLightSwitch } from '../EspLightSwitch';
import axios from 'axios';

export class EspLightSwitchDecoratorIsActive implements ObjectDecorator<EspLightSwitch> {
    async decorate(object: EspLightSwitch): Promise<EspLightSwitch> {
        console.log("ESP DECORATE");
        const value = await this.getState(object);
        object.isActive = value;
        return new Promise((resolve) => {
            resolve(object);
        })
    }

    async digest(object: EspLightSwitch): Promise<EspLightSwitch> {
        console.log("ESP DIGEST");
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
        console.log("SEND STATE" + object);
        //try {
        console.log("TRY TO SEND DATA " + object.address);
        const instance = axios.create({
            timeout: 20
        });
        const response = await instance.get(object.address + '/led', {
            params: {
                on: value,
                id: object.remoteId
            }
        });
        console.log("AFTER RESPONSE");
        let data = parseInt(response.data);
        if (data == 1) {
            currentValue = true;
        } else if (data == 0) {
            currentValue = false;
        }
        console.log(response);
        //} catch (error) {
        console.log("THERE IS AN ERROR IN SET STATE REQUEST ");
        //console.log(error.name);
        //console.log(error.message);
        currentValue = false
        //}

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
                timeout: 20
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
            console.log("THERE IS AN ERROR IN THIS REQUEST ");
            console.log(error.detail);
            isActive = false
        }

        return new Promise((resolve) => {
            resolve(isActive);
        })
    }
}