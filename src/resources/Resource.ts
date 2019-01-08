
import {Server} from 'restify';

export interface Resource {
    initialize(server: Server): void;
}