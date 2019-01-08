import * as restify from 'restify';


export class App {
    private readonly server: restify.Server
    constructor() {
        this.server = restify.createServer();
        this.server.use(restify.plugins.queryParser());
        this.server.use(restify.plugins.bodyParser());
    }

    public getServer() {
        return this.server;
    }

    public start(port:Number = 3001) {
        this.server.listen(port, () => {
            console.log('server up');  
        })
    }
}   
