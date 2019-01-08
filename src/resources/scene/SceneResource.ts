import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource'
import {sceneService} from './SceneService'
import {HttpServer} from '../../httpServer'

export class SceneResource implements Resource {
    public initialize(server: HttpServer):void {
        server.get("/scene", this.list);
        server.post("/scene/", this.create.bind(this))
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await sceneService.list());
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await sceneService.create(req.body));
    }
}