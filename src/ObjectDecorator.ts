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

    decorate(object: T): Promise<T> {
        var localObject = object;
        this.decorators.forEach(async (decorator) => {
            localObject = await decorator.decorate(localObject);
        })
        return new Promise((resolve) => {
            resolve(localObject);
        })
    }

    digest(object: T): Promise<T> {
        var localObject = object;
        this.decorators.forEach(async (decorator) => {
            localObject = await decorator.digest(localObject);
        })
        return new Promise((resolve) => {
            resolve(localObject);
        })
    }
}