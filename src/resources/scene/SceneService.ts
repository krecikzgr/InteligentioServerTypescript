import { Scene } from "./Scene";
import { SceneSetting } from "../sceneSetting/SceneSetting";
import {DatabaseProvider} from '../../utilities/Database';
import {sensorService} from '../sensor/SensorService';

export class SceneService {
    public async create(scene: Scene): Promise<Scene> {
        // Normally DTO !== DB-Entity, so we "simulate" a mapping of both
        const newScene = new Scene();
        newScene.name = scene.name;
        newScene.description = scene.description;

        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Scene).save(newScene);
    }

    public async list(): Promise<Scene[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Scene).find();
    }

    public async activateScene(sceneId:number):Promise<Scene> {
        const connection = await DatabaseProvider.getConnection();
        const scene = await connection.getRepository(Scene).findOne(sceneId);
        if( scene == null ) {
            return Promise.resolve(null);
        } 
        await Promise.all(scene.settings.map( async (setting) => {
            sensorService.activate(setting.sensorId, setting.isActive);
        }));
        return await connection.getRepository(Scene).save(scene);
    }
}

export const sceneService = new SceneService();