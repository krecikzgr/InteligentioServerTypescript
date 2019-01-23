import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource';
import {sensorService} from './SensorService';
import {HttpServer} from '../../httpServer';

export class SensorResource implements Resource {
    public initialize(server: HttpServer):void {
        server.get("/sensor", this.list);
        server.post("/sensor/", this.create.bind(this))
        server.get("/sensor/:id", this.get)
        server.patch("/sensor/:id/activate", this.activate)
        server.patch("/sensor/:id", this.update)
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await sensorService.list());
    }

    private async get(req: Request, res: Response): Promise<void> {
        res.send(await sensorService.getById(req.params.id))
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await sensorService.create(req.params.sceneId,req.body));
    }

    private async activate(req: Request, res: Response): Promise<void> {
        res.send(await sensorService.activate(req.params.id, req.body.isActive));
    }
    private async update(req:Request, res: Response): Promise<void>  {
        res.send(await sensorService.update(req.params.id, req.body));
    }
}