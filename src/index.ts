import Framework from "./framework";
import Router from "./router";
import Middleware from "./midlleware";
const app = new Framework();
const router = new Router();
const middleware = new Middleware();

middleware.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
middleware.use((req,res, next) => {
    console.log(`second middleware`);
    next()
})
router.get('/home', (req, res) => {
    res.statusCode = 200;
    res.end("Welcome to the home");
})
router.get('/about', (req, res) => {
  res.end('About Us Page');
});

app.useRouter(router)
app.useMiddleware(middleware)
const port =  3000;
app.start(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})