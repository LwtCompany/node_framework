import {IncomingMessage, ServerResponse} from "http";

type Handler = (req: IncomingMessage, res: ServerResponse) => void;
class Router{
    private  routes:{[key:string]:{[key:string]: Handler}} = {};
    public get(path: string, handler: Handler){
        this.addRoute('GET', path, handler)
    }
    public post(path:string, handler: Handler){
        this.addRoute('POST', path, handler)
    }
    public addRoute(method: string, path: string, handler: Handler){
        if(!this.routes[method]){
            this.routes[method] = {}
        }
        this.routes[method][path] = handler;
    }

    public handler(req:IncomingMessage, res: ServerResponse){
        const path = req.url!;
        const method = req.method!;
        const handler = this.routes[method]?.[path];

        if(handler){
            handler(req, res);
            return true
        }else{
            return  false;
        }
    }
}

export default Router;