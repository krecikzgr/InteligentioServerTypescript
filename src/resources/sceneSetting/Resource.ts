import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource'
import {sceneSettingService} from './SceneSettingService'
import {HttpServer} from '../../httpServer'

export class SceneSettingResource implements Resource {
    public initialize(server: HttpServer):void {
        server.get("/sceneSetting", this.list);
        server.post("/sceneSetting", this.create.bind(this))
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await sceneSettingService.list());
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await sceneSettingService.create(req.params.sceneId,req.body));
    }
}