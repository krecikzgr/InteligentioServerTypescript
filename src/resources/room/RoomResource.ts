import { Request, Response, Next } from 'restify';
import { Resource } from '../Resource'
import { roomService } from './RoomService'
import { HttpServer } from '../../httpServer'
import { ResponseBuilder } from '../../utilities/ResponseBuilder';

export class RoomResource implements Resource {
    public initialize(server: HttpServer): void {
        server.get("/room", this.list);
        server.post("/room/", this.create.bind(this))
        server.get("/room/:id", this.get)
        server.patch("/room/:id", this.update)
    }

    private async list(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await roomService.list();
            responseBuilder.withData(data)
                .withMessage("Objects")
                .build(res);
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.detail)
                .build(res)
        }
    }

    private async get(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await roomService.getById(req.params.id)
            responseBuilder.withData(data)
                .withMessage("Object")
                .build(res);
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.detail)
                .build(res)
        }
    }

    private async create(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await roomService.create(req.body)
            responseBuilder.withData(data)
                .withMessage("Object")
                .build(res);
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.detail)
                .build(res)
        }
    }

    private async update(req: Request, res: Response): Promise<void> {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await roomService.update(req.params.id, req.body)
            responseBuilder
                .withMessage("Object")
                .withData(data)
                .build(res)
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.detail)
                .build(res)
        }
    }
}