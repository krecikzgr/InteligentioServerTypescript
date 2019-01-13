import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource';
import {sensorService} from './SensorService';
import {HttpServer} from '../../httpServer';

export class SensorResource implements Resource {
    public initialize(server: HttpServer):void {
        server.get("/sensor", this.list);
        server.post("/sensor/", this.create.bind(this))
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await sensorService.list());
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await sensorService.create(req.params.sceneId,req.body));
    }

    
}