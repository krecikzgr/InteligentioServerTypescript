import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource'
import {sceneSettingService} from './SceneSettingService'
import {HttpServer} from '../../httpServer'
import {ResponseBuilder} from '../../utilities/ResponseBuilder';
import { Any } from 'typeorm';

export class SceneSettingResource implements Resource {
    public initialize(server: HttpServer):void {
        server.get("/sceneSetting", this.list);
        server.post("/sceneSetting", this.create.bind(this))
    }

    private async list(req: Request, res: Response){
        const sceneId = req.query.sceneId ? parseInt(req.query.sceneId, 10) : -1;
        const responseBuilder = new ResponseBuilder();
        try {
            var data = new Object();
            if(sceneId > 0) {
                console.log("ScENE SETTINGS FROM SCENE")
                data = await sceneSettingService.settingsFromScene(req.query.sceneId)
            } else {
                data = await sceneSettingService.list()
            }
            if( data == null ) {
                responseBuilder
                .withHttpResourceNotAvailable()
                .withData([])
                .withMessage("No object with given id")
                .build(res)
            } else {
                responseBuilder.withData(data)
                .withMessage("Objects")
                .build(res);
            }
        } catch (e) {
            console.log("error" + e)
        }
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await sceneSettingService.create(req.body.sceneId,req.body));
    }
}