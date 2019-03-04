import { Scene } from "./Scene";
import { DatabaseProvider } from '../../utilities/Database';
import { ObjectService } from "../ObjectService";

export class SceneService extends ObjectService<Scene> {
    registerDecorators() {

    }

    public async create(object: Scene): Promise<Scene> {
        let newObject = new Scene();
        newObject = object;
        const connection = await DatabaseProvider.getConnection();
        await connection.getRepository(Scene).save(newObject);
        return this.decoratorService.digest(newObject);
    }

    public async getById(id: number): Promise<Scene> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Scene).findOne(id);
    }

    public async list(): Promise<Scene[]> {
        const connection = await DatabaseProvider.getConnection();
        const localObjects = await connection.getRepository(Scene).find();
        return await Promise.all(localObjects.map(async (localObject) => {
            return await this.decoratorService.decorate(localObject);
        }));
    }

    public async update(id: number, object: Scene): Promise<Scene> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Scene)
        const oldObject = await repository.findOne(id);
        await repository.merge(oldObject, object);
        await repository.save(oldObject);
        return this.decoratorService.digest(oldObject);
    }

    public async delete(id: number) {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Scene);
        repository.delete(id);
    }
}

export const sceneService = new SceneService();