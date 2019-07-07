import { DatabaseProvider } from '../../utilities/Database';
import { ESPLightSwitch } from './EspLightSwitch';
import { ObjectService } from "../ObjectService";
import { ESPLightSwitchDecoratorIsActive } from './decorators/EspLightSwitchDecorator';

export class EspLightSwitchService extends ObjectService<ESPLightSwitch>{

    registerDecorators() {
        this.decoratorService.addDecorator(new ESPLightSwitchDecoratorIsActive());
    }

    public async create(object: ESPLightSwitch): Promise<ESPLightSwitch> {
        let newObject = new ESPLightSwitch();
        newObject = object;
        const connection = await DatabaseProvider.getConnection();
        await connection.getRepository(ESPLightSwitch).save(newObject);
        return this.decoratorService.digest(newObject);
    }

    public async getById(id: number): Promise<ESPLightSwitch> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(ESPLightSwitch).findOne(id);
    }

    public async list(): Promise<ESPLightSwitch[]> {
        const connection = await DatabaseProvider.getConnection();
        const localObjects = await connection.getRepository(ESPLightSwitch).find();
        let pushedObjects = []
        await Promise.all(localObjects.map(async (localObject) => {
            const decoratedObject = await this.decoratorService.decorate(localObject);
            pushedObjects.push(decoratedObject)
        }));
        return pushedObjects;
    }

    public async update(id: number, object: ESPLightSwitch): Promise<ESPLightSwitch> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(ESPLightSwitch)
        let oldObject = await repository.findOne(id);
        object = await this.decoratorService.digest(object);
        await repository.merge(oldObject, object);
        await repository.save(oldObject);
        oldObject = await this.decoratorService.decorate(oldObject);
        return oldObject
    }

    public async listForRoom(roomId: number): Promise<ESPLightSwitch[]> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(ESPLightSwitch)
        const localObjects = await repository.find({ where: { roomId: roomId } });
        let decoratedObjects = []
        await Promise.all(localObjects.map(async (localObject) => {
            const decoratedObject = await this.decoratorService.decorate(localObject);
            decoratedObjects.push(decoratedObject);
        }));
        return decoratedObjects
    }

    public async delete(id: number) {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(ESPLightSwitch);
        repository.delete(id);
    }
}

export const espLightSwitchService = new EspLightSwitchService();