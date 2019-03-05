import { ObjectDecorator } from '../../../ObjectDecorator';
import { Scene } from '../Scene';
import { sceneSettingService } from '../../sceneSetting/SceneSettingService';
import { sensorService } from '../../sensor/SensorService';


export class SceneDecoratorIsActive implements ObjectDecorator<Scene> {
    async decorate(object: Scene): Promise<Scene> {
        const localObject = object;
        const sceneSettings = await sceneSettingService.listForScene(object.id)
        let value: boolean = true;
        await Promise.all(sceneSettings.map(async (sceneSetting) => {
            try {
                const sensor = await sensorService.getById(sceneSetting.sensorId);
                value = ( sensor.isActive == sceneSetting.isActive ) && value
            } catch (e) {
                value = false
            }
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