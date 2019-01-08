
import {Response} from 'restify';

export class ResponseBuilder {

    private httpCode:number
    private message:String

    constructor(){
        this.httpCode = 200
    }
    withHttpCode(code){
        this.httpCode = code
        return this
    }
    withHttpSuccess(){
        this.httpCode = 200
        return this
    }   
    withHttpUnauthorized() {
        this.httpCode = 401
        return this
    }
    withHttpBadRequest() {
        this.httpCode = 400
        return this
    }
    withHttpResourceNotAvailable() {
        this.httpCode = 404
        return this
    }
    //TODO: How to
    // withJsonData(data) {
    //     this.data = data
    //     return this
    // }
    withMessage(message) {
        this.message = message
        return this
    }
    build(response:Response) {
        response.status(this.httpCode)
        response.send({ 'message': this.message,
        'data': "Data to be passed"})
    }
}

module.exports = {
    ResponseBuilder
}