import {Request, Response, Next} from 'restify';
import {Resource} from '../Resource';
import {sensorService} from './SensorService';
import {HttpServer} from '../../httpServer';
import {ResponseBuilder} from '../../utilities/ResponseBuilder';

export class SensorResource implements Resource {

    public initialize(server: HttpServer):void {
        server.get("/sensor", this.list);
        server.post("/sensor/", this.create.bind(this))
        server.get("/sensor/:id", this.get)
        server.patch("/sensor/:id/activate", this.activate)
        server.patch("/sensor/:id", this.update)
    }

    private async list(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        const data = await sensorService.list();
        responseBuilder.withData(data)
        .withMessage("Objects")
        .build(res);
    }

    private async get(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        const data = await sensorService.getById(req.params.id)
        if( data == null ) {
            responseBuilder
            .withHttpResourceNotAvailable()
            .withMessage("No object with given id")
            .build(res)
        } else {
            responseBuilder.withData(data)
            .withMessage("Object")
            .build(res);
        }
    }

    private async create(req: Request, res: Response){
        const responseBuilder = new ResponseBuilder();
        const data = await sensorService.create(req.params.sceneId,req.body)
        if( data == null ) {
            responseBuilder
            .withHttpResourceNotAvailable()
            .withMessage("No object with given id")
            .build(res)
        } else {
            responseBuilder.withData(data)
            .withMessage("Object")
            .build(res);
        }
    }

    private async activate(req: Request, res: Response){
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await sensorService.activate(req.params.id, req.body.isActive)
            if( data == null ) {
                responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage("No object with given id")
                .build(res)
            } else {
                responseBuilder.withData(data)
                .withMessage("Object")
                .build(res);
            }
        } catch (e) {
            console.log("error" + e)
        }
    }
    
    private async update(req:Request, res: Response): Promise<void>  {
        const responseBuilder = new ResponseBuilder();
        const data = await sensorService.update(req.params.id, req.body)
        if( data == null ) {
            responseBuilder
            .withHttpResourceNotAvailable()
            .withMessage("No object with given id")
            .build(res)
        } else {
            responseBuilder.withData(data)
            .withMessage("Object")
            .build(res);
        }
    }
}