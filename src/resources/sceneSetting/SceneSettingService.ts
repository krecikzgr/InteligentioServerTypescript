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
        let pushedObjects = []
        await Promise.all(localObjects.map(async (localObject) => {
            const decoratedObject = await this.decoratorService.decorate(localObject);
            pushedObjects.push(decoratedObject)
        }));
        return pushedObjects;
    }

    public async update(id: number, object: SceneSetting): Promise<SceneSetting> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(SceneSetting)
        let oldObject = await repository.findOne(id);
        object = await this.decoratorService.digest(object);
        await repository.merge(oldObject, object);
        await repository.save(oldObject);
        oldObject = await this.decoratorService.decorate(oldObject);
        return oldObject
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