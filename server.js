import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import './connection.js'
const app = express();
const port = process.env.PORT || 3500;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// app.use('/home/users', userRouter);
app.use('/home', userRouter);

app.get('/',(req,res)=>{
    res.send(`To register user used /home/signup API <br/>
    To login used /home/login API <br/> 
    To access all user data used /home/getuserInfo API `);
})

app.listen(port, ()=>{
    console.log(`server Statred at http://localhost:${port}`);
})