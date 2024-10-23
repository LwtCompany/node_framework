import http, {IncomingMessage,ServerResponse} from 'http'
import Router from "./router";
import Middleware from "./midlleware";


class Framework {
    private routers:Router[] = [];
    private middlewares:Middleware[] = [];

    public start(port:number, cb: (() => void) | undefined = undefined) {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(port, cb);
    }
    public useRouter(router:Router){
        this.routers.push(router);
    }
    public useMiddleware(middleware:Middleware){
        this.middlewares.push(middleware);
    }
    private handleRequest(req: IncomingMessage, res: ServerResponse){
        let i = 0;
        const next = () => {
                if(i < this.middlewares.length){
                this.middlewares[i].runMiddleware(req, res, () => {
                     for (const router of this.routers) {
                        if (router.handler(req, res)) {
                          return; // Stop when a route is handled
                        }
                      }

                      res.statusCode = 404;
                      res.end('Not Found');
                })
                i++;
            }
        }
        next();

    }

}

export default Framework;