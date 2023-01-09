import express from "express";
import userInfo from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  if(req.body.email === '' || req.body.cellnum === '' ||  req.body.password === '' || req.body.Country === '' || req.body.State === '' || req.body.City === '' || req.body.img === ''){
    res.send("You Missed Some Input Fields!");
  }
  else{
    const result = await userInfo.findOne({ email: req.body.email });
  if (result) {
    res.status(409).send("Email already exist");
    // console.log("Email already exist");
  } else {
    const newUser = new userInfo({
      name: req.body.name,
      cellnum: req.body.cellnum,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      Country:req.body.Country,
      State: req.body.State,
      City: req.body.City,
      img: req.body.img,
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      cellnum: req.body.cellnum,
      email: user.email,
      isAdmin: user.isAdmin,
      Country:req.body.Country,
      State: req.body.State,
      City: req.body.City,
      token: jwt.sign({ user }, "my_encryption_text_key"),
    });
  }
  }
});

userRouter.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await userInfo.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // console.log(user);
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: jwt.sign({ user }, "my_encryption_text_key"),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

userRouter.get("/getuserInfo",async(req,res) => {
  try{
      const alluser = await userInfo.find({});
      res.status(200).send(alluser);
  }catch(err){
      res.status(500).json("cannot get data");
  }
})

export default userRouter;
