import { DecoratorService } from "../ObjectDecorator";


export class ObjectService<T> {
    decoratorService: DecoratorService<T>;

    constructor() {
        this.decoratorService = new DecoratorService<T>();
    }

    registerDecorators() {}
}