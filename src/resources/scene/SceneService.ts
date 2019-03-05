import { Scene } from "./Scene";
import { DatabaseProvider } from '../../utilities/Database';
import { ObjectService } from "../ObjectService";
import { SceneDecoratorIsActive } from "./decorators/SceneDecoratorIsActive";

export class SceneService extends ObjectService<Scene> {
    registerDecorators() {
        this.decoratorService.addDecorator(new SceneDecoratorIsActive());
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
        let pushedObjects = []
        await Promise.all(localObjects.map(async (localObject) => {
            const decoratedObject = await this.decoratorService.decorate(localObject);
            pushedObjects.push(decoratedObject)
        }));
        return pushedObjects;
    }

    public async update(id: number, object: Scene): Promise<Scene> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Scene)
        let oldObject = await repository.findOne(id);
        object = await this.decoratorService.digest(object);
        await repository.merge(oldObject, object);
        await repository.save(oldObject);
        oldObject = await this.decoratorService.decorate(oldObject);
        return oldObject
    }

    public async delete(id: number) {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(Scene);
        repository.delete(id);
    }
}

export const sceneService = new SceneService();