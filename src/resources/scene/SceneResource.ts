import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource';
import {sceneService} from './SceneService';
import {HttpServer} from '../../httpServer';
import {ResponseBuilder} from '../../utilities/ResponseBuilder';

export class SceneResource implements Resource {
    public initialize(server: HttpServer):void {
        server.get("/scene", this.list);
        server.post("/scene/", this.create.bind(this))
    }

    private async list(req: Request, res: Response): Promise<void> {
        const responseBuilder = new ResponseBuilder();
        const data = await sceneService.list();
        responseBuilder.withData(data)
        .withMessage("Objects")
        .build(res);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await sceneService.create(req.body));
    }
}