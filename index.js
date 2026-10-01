import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js"

const app = express();

dotenv.config()

app.use(express.json());

connectDB();              


app.get("/", (req, res)=>{
    res.json({
        message: "Hello from backend."
    })
})

app.use("/user", userRoute )



app.listen(process.env.PORT, ()=>{
    console.log("server is listining on port",  process.env.PORT)
})

