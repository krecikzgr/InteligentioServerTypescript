import {Server,  Request, Response, Next} from 'restify';
import {Resource} from '../Resource'
import {sceneService} from './SceneService'

export class SceneResource implements Resource {
    public initialize(server:Server):void {
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