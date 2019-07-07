import { Request, Response, Next } from 'restify';
import { ObjectService } from "../../resources/ObjectService";
import { Knot } from "../knot/Knot";

abstract class EspService<T extends Knot> extends ObjectService<T> {
    refreshKnots() {
        //TODO: download all information about knots of given class
    }

    bindKnot(knot: T) {
        //TODO: send to knot the information where server is connected ( and it's ip)
    }
}
