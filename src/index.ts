import Framework from "./framework";
import Router from "./router";
const app = new Framework();
const router = new Router();
router.get('/home', (req, res) => {
    res.statusCode = 200;
    res.end("Welcome to the home");
})
router.get('/about', (req, res) => {
  res.end('About Us Page');
});

app.useRouter(router)
const port =  3000;
app.start(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})