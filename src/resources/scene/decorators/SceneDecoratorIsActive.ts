import { ObjectDecorator } from '../../../ObjectDecorator';
import { Scene } from '../Scene';
import { sceneSettingService } from '../../sceneSetting/SceneSettingService';
import { sensorService } from '../../sensor/SensorService';
import { sceneService } from '../SceneService';


export class SceneDecoratorIsActive implements ObjectDecorator<Scene> {
    async decorate(object: Scene): Promise<Scene> {
        const localObject = object;
        const sceneSettings = await sceneSettingService.listForScene(object.id)
        let value: boolean = false;
        console.log("START DECORATING  number of scene settings " + sceneSettings.length)
        await Promise.all(sceneSettings.map(async (sceneSetting) => {
            try {
                const sensor = await sensorService.getById(sceneSetting.sensorId);
                console.log("control sensor with name " + sensor.name);
                value = ( sensor.isActive == sceneSetting.isActive ) && value
            } catch (e) {
                console.log("No sensor for sensor setting")
                value = false
            }
            console.log("STOP DECORATING")
        }));
        localObject.isActive = value;
        return localObject;
    }

    async digest(object: Scene): Promise<Scene> {
        let localObject = object;
        const sceneSettings = await sceneSettingService.listForScene(object.id)
        await Promise.all(sceneSettings.map(async (sceneSetting) => {
            try {
                const sensor = await sensorService.getById(sceneSetting.sensorId);
                sensor.isActive = localObject.isActive && sceneSetting.isActive
                await sensorService.update(sensor.id, sensor);
            } catch (e) {
                console.log("No sensor for sensor setting")
            }
        }));

        return localObject;
    }
}