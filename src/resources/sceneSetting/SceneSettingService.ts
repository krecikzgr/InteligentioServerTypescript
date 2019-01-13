import {DatabaseProvider} from '../../utilities/Database';
import { SceneSetting } from "./SceneSetting";
import { Scene } from "../scene/Scene";

export class SceneSettingService {
    public async create(sceneId:number,setting: SceneSetting): Promise<SceneSetting> {
        const connection = await DatabaseProvider.getConnection();

        const newObject = new SceneSetting();
        newObject.isActive = setting.isActive;

        const scene = await connection.getRepository(Scene).findOne(sceneId);
        if (!scene) {
            return
        }
        newObject.scene = scene;
        return await connection.getRepository(SceneSetting).save(newObject);    
    }

    public async getById(id:number): Promise<SceneSetting> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(SceneSetting).findOne(id);
    }

    public async list(): Promise<SceneSetting[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(SceneSetting).find();
    }
}

export const sceneSettingService = new SceneSettingService();