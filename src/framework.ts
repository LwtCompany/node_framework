import http, {IncomingMessage,ServerResponse} from 'http'
import Router from "./router";


class Framework {
    private routers:Router[] = [];
    public start(port:number, cb: (() => void) | undefined = undefined) {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(port, cb);
    }
    public useRouter(router:Router){
        this.routers.push(router);
    }
    private handleRequest(req: IncomingMessage, res: ServerResponse){
        for (const router of this.routers) {
              if (router.handler(req, res)) {
                return;
              }
            }

            res.statusCode = 404;
            res.end('Not Found');
    }

}

export default Framework;