
import {HttpServer} from '../httpServer'
import {SceneResource} from './scene/SceneResource'



export interface Resource {
    initialize(httpServer: HttpServer): void;
}

export const RESOURCES = [
    new SceneResource()
]