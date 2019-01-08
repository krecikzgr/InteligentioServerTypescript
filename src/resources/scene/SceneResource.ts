import {Server,  Request, Response, Next} from 'restify';
import {Resource} from '../Resource'

export class SceneResource implements Resource {
    public initialize(server:Server):void {
        server.get("/sample", this.findDocuments);
    }


    private async list(req: Request, res: Response): Promise<void> {
        res.send("Some response");
    }

    findDocuments = (req: Request, res: Response, next: Next) => {
        res.send(200, "SOMETHING");
        next()
    }
}