import { DatabaseProvider } from '../../utilities/Database';
import { EspLightSwitch } from './EspLightSwitch';
import { ObjectService } from "../ObjectService";
import { EspLightSwitchDecoratorIsActive } from './decorators/EspLightSwitchDecorator';

export class EspLightSwitchService extends ObjectService<EspLightSwitch>{

    registerDecorators() {
        this.decoratorService.addDecorator(new EspLightSwitchDecoratorIsActive());
    }

    public async create(object: EspLightSwitch): Promise<EspLightSwitch> {
        let newObject = new EspLightSwitch();
        newObject = object;
        const connection = await DatabaseProvider.getConnection();
        await connection.getRepository(EspLightSwitch).save(newObject);
        return this.decoratorService.digest(newObject);
    }

    public async getById(id: number): Promise<EspLightSwitch> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(EspLightSwitch).findOne(id);
    }

    public async list(): Promise<EspLightSwitch[]> {
        const connection = await DatabaseProvider.getConnection();
        const localObjects = await connection.getRepository(EspLightSwitch).find();
        let pushedObjects = []
        await Promise.all(localObjects.map(async (localObject) => {
            const decoratedObject = await this.decoratorService.decorate(localObject);
            pushedObjects.push(decoratedObject)
        }));
        return pushedObjects;
    }

    public async update(id: number, object: EspLightSwitch): Promise<EspLightSwitch> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(EspLightSwitch)
        let oldObject = await repository.findOne(id);
        object = await this.decoratorService.digest(object);
        await repository.merge(oldObject, object);
        await repository.save(oldObject);
        oldObject = await this.decoratorService.decorate(oldObject);
        return oldObject
    }

    public async listForRoom(roomId: number): Promise<EspLightSwitch[]> {
        const connection = await DatabaseProvider.getConnection();
        const repository = await connection.getRepository(EspLightSwitch)
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
        const repository = await connection.getRepository(EspLightSwitch);
        repository.delete(id);
    }
}

export const espLightSwitchService = new EspLightSwitchService();