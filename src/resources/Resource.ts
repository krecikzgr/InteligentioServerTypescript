
import { HttpServer } from '../httpServer'
import { SceneResource } from './scene/SceneResource'
import { SceneSettingResource } from './sceneSetting/SceneSettingResource';
import { RoomResource } from './room/RoomResource';
import { EspLightSwitchResource } from './espLightSwitch/EspLightSwitchResource';


export interface Resource {
    initialize(httpServer: HttpServer): void;
}

export const RESOURCES = [
    new SceneResource(),
    new SceneSettingResource(),
    new RoomResource(),
    new EspLightSwitchResource()
]