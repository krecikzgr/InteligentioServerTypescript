import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource'
import {roomService} from './RoomService'
import {HttpServer} from '../../httpServer'

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
        res.send(await roomService.activate(req.params.id, req.body.isActive));
    }
}