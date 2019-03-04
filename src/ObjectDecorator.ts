export interface ObjectDecorator<T> {
    //HOW TO declare async interface
    decorate(object: T): Promise<T>
    digest(object: T): Promise<T>
}

export class DecoratorService<T> {
    decorators: ObjectDecorator<T>[];

    constructor() {
        this.decorators = []
    }

    addDecorator(decorator: ObjectDecorator<T>) {
        this.decorators.push(decorator);
    }

    async decorate(object: T): Promise<T> {
        var localObject = object;
        await Promise.all(this.decorators.map(async (decorator) => {
            localObject = await decorator.decorate(localObject);
        }));
        return localObject
    }

    async digest(object: T): Promise<T> {
        var localObject = object;
        await Promise.all(this.decorators.map(async (decorator) => {
            localObject = await decorator.digest(localObject);
        }));
        return localObject;
    }
}