import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource';
import {sceneService} from './SceneService';
import {HttpServer} from '../../httpServer';
import {ResponseBuilder} from '../../utilities/ResponseBuilder';

export class SceneResource implements Resource {
    public initialize(server: HttpServer): void {
        server.get("/scene", this.list);
        server.post("/scene/", this.create.bind(this))
        server.get("/scene/:id", this.get)
        server.patch("/scene/:id", this.update)
    }

    private async list(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await sceneService.list();
            responseBuilder.withData(data)
                .withMessage("Objects")
                .build(res);
        } catch (e) {
            console.log(e)
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.message)
                .build(res)
        }
    }

    private async get(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await sceneService.getById(req.params.id)
            responseBuilder.withData(data)
                .withMessage("Object")
                .build(res);
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.message)
                .build(res)
        }
    }

    private async create(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await sceneService.create(req.body)
            responseBuilder.withData(data)
                .withMessage("Object")
                .build(res);
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.message)
                .build(res)
        }
    }

    private async update(req: Request, res: Response): Promise<void> {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await sceneService.update(req.params.id, req.body)
            responseBuilder
                .withMessage("Object")
                .withData(data)
                .build(res)
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.message)
                .build(res)
        }
    }
}