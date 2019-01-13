import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource'
import {roomService} from './RoomService'
import {HttpServer} from '../../httpServer'

export class RoomResource implements Resource {
    public initialize(server: HttpServer):void {
        server.get("/room", this.list);
        server.post("/room/", this.create.bind(this))
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await roomService.list());
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await roomService.create(req.body));
    }
}