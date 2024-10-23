import {IncomingMessage, ServerResponse} from "http";

type MiddlewareFunction = (req:IncomingMessage, res: ServerResponse, next: () => void) => void;

class Middleware{
    private middleware: MiddlewareFunction[] = [];
    public use(middleware: MiddlewareFunction){
        this.middleware.push(middleware);
    }

    public runMiddleware(req: IncomingMessage, res: ServerResponse, finalHandler: () => void){
        let i = 0;
        const next = () => {
            const middleware = this.middleware[i++];
            if(middleware){
                middleware(req, res, next);
            }else{
                finalHandler();
            }
        }
        next();
    }


}

export default Middleware;