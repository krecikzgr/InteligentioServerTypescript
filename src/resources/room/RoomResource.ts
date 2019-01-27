import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource'
import {roomService} from './RoomService'
import {HttpServer} from '../../httpServer'
import {ResponseBuilder} from '../../utilities/ResponseBuilder';

export class RoomResource implements Resource {
    public initialize(server: HttpServer):void {
        server.get("/room", this.list);
        server.post("/room/", this.create.bind(this));
        server.patch("/room/:id/activate", this.activate);
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await roomService.list());
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await roomService.create(req.body));
    }

    private async activate(req: Request, res: Response): Promise<void> {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await roomService.activate(req.params.id, req.body.isActive);
            responseBuilder
            .withMessage("Did activate room " + req.params.id)
            .withData(data)
            .build(res);
        } catch (e) {
            console.log("Error while activating room " + req.params.id + " " + e)
            responseBuilder
            .withMessage("Could not activate room " + req.params.id )
            .withHttpResourceNotAvailable()
            .build(res);
        }
    }
}