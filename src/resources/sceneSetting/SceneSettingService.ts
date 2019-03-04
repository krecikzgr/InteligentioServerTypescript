import { DatabaseProvider } from '../../utilities/Database';
import { SceneSetting } from "./SceneSetting";
import { ObjectService } from "../ObjectService";

export class SceneSettingService extends ObjectService<SceneSetting>{

    registerDecorators() {
        
    }

    public async create(object: SceneSetting): Promise<SceneSetting> {
        let newObject = new SceneSetting();
        newObject = object;
        const connection = await DatabaseProvider.getConnection();
        await connection.getRepository(SceneSetting).save(newObject);
        return this.decoratorService.digest(newObject);
    }

    public async getById(id: number): Promise<SceneSetting> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(SceneSetting).findOne(id);
    }

    public async list(): Promise<SceneSetting[]> {
        const connection = await DatabaseProvider.getConnection();
        const localObjects = await connection.getRepository(SceneSetting).find();
        return await Promise.all(localObjects.map(async (localObject) => {
            return await this.decoratorService.decorate(localObject);
        }));
    }

    public async update(id: number, object: SceneSetting): Promise<SceneSetting> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(SceneSetting)
        const oldObject = await repository.findOne(id);
        await repository.merge(oldObject, object);
        await repository.save(oldObject);
        return this.decoratorService.digest(oldObject);
    }

    public async delete(id: number) {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(SceneSetting);
        repository.delete(id);
    }

    // public async settingsFromScene(sceneId: number): Promise<SceneSetting[]> {
    //     const connection = await DatabaseProvider.getConnection();
    //     return await connection.getRepository(SceneSetting).find({ where: { sceneId: sceneId } });
    // }
}

export const sceneSettingService = new SceneSettingService();