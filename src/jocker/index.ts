import http from 'http';
export default class Jocker {
    private server: any;
    private port: number | undefined;
    private routes: { [key: string]: { [key: string]: Function } } = {
        GET:{},
        POST:{}
    };
    constructor() {
        this.server = this.init();
    }

    private init(){
        return http.createServer((req:any, res:any) => {
            const handler = this.routes[req.method][req.url];
              if (handler) {
                handler(req, res);
              } else {
                res.statusCode = 404;
                res.end('Not Found');
              }
        });
    }

    public listen(port: number, handler:Function | undefined) {
        this.port = port;
        this.server.listen(port, handler);
    }

    public get(url:string, handler:Function) {
            this.addRoutes('GET', url, handler);
    }
    public post(url:string, handler:Function) {
        this.addRoutes('POST', url, handler);
    }
    private addRoutes (method:string, url:string, handler:Function)  {
     this.routes[method][url] = handler;
    }
}