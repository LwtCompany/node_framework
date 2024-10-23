import Jocker from "./jocker";

const app = new Jocker();

app.get('/', (req:any, res:any)=>{
    res.send('Welcome to Jocker!');
})
app.listen(3000, () => {
    console.log("Listening on 3000");
})