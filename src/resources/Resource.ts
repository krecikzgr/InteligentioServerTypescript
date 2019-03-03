
import { HttpServer } from '../httpServer'
import { SceneResource } from './scene/SceneResource'
import { SceneSettingResource } from './sceneSetting/SceneSettingResource';
import { RoomResource } from './room/RoomResource';
import { SensorResource } from './sensor/SensorResource';


export interface Resource {
    initialize(httpServer: HttpServer): void;
}

export const RESOURCES = [
    new SceneResource(),
    new SceneSettingResource(),
    new RoomResource(),
    new SensorResource()
]