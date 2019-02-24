export interface ObjectDecorator<T> {
    //HOW TO declare async interface
    decorate(object:T): Promise<T>
    digest(object:T): Promise<T>
}

export interface DecoratorService<T> {
    decorators:ObjectDecorator<T>[];
    decorate(object:T): Promise<T>
    digest(object:T): Promise<T>
}