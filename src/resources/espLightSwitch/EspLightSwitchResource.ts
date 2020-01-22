import { Request, Response, Next } from 'restify';
import { Resource } from '../Resource';
import { HttpServer } from '../../HttpServer';
import { ResponseBuilder } from '../../utilities/ResponseBuilder';
import { espLightSwitchService } from './EspLightSwitchService';

export class EspLightSwitchResource implements Resource {

    public initialize(server: HttpServer): void {
        server.get("/lightSwitch", this.list);
        server.post("/lightSwitch/", this.create.bind(this))
        server.get("/lightSwitch/:id", this.get)
        server.patch("/lightSwitch/:id", this.update)
    }

    private async list(req: Request, res: Response) {
        console.log("LIST LIGHT SWITCHES");
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await espLightSwitchService.list();
            responseBuilder.withData(data)
                .withMessage("Objects")
                .build(res);
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.detail)
                .build(res)
        }
    }

    private async get(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await espLightSwitchService.getById(req.params.id)
            responseBuilder.withData(data)
                .withMessage("Object")
                .build(res);
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.detail)
                .build(res)
        }
    }

    private async create(req: Request, res: Response) {
        const responseBuilder = new ResponseBuilder();
        console.log("CREATE THAT STRANGE OBJECT");
        try {
            const data = await espLightSwitchService.create(req.body)
            responseBuilder.withData(data)
                .withMessage("Object")
                .build(res);
        } catch (e) {
            console.log("CREATE THAT STRANGE OBJECT ERROR");
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.detail)
                .build(res)
        }
    }

    private async update(req: Request, res: Response): Promise<void> {
        const responseBuilder = new ResponseBuilder();
        try {
            const data = await espLightSwitchService.update(req.params.id, req.body)
            responseBuilder
                .withMessage("Object")
                .withData(data)
                .build(res)
        } catch (e) {
            responseBuilder
                .withHttpResourceNotAvailable()
                .withMessage(e.detail)
                .build(res)
        }
    }
}