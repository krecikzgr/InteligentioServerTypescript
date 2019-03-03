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
}

export const sceneService = new SceneService();