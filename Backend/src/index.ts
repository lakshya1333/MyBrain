import express, { Request, Response } from "express";
import { ContentModel, LinkModel, UserModel } from "./db"
const app = express()
const port = 3000
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
import z from "zod"
import bcrypt from "bcrypt"
import { userMiddleware } from "./middleware";
import { random } from "./utils"
import cors from "cors";

app.use(cors())
app.use(express.json())
app.post("/api/v1/signup", async (req,res) => {
    const requiredbody = z.object({
      username: z.string().email().min(3).max(100),
      password: z.string().min(3).max(100),
    });

    const parsedData = requiredbody.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ message: "Incorrect format" });
    }
  
    const { username, password } = parsedData.data;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.create({
        username,
        password: hashedPassword,
      });
      return res.status(201).json({ message: "User created" });
    } catch (e) {
      console.error(e);
      return res.status(409).json({ message: "User already exists" });
    }
});

app.post("/api/v1/signin",async (req,res)=>{
  const username = req.body.username
  const password = req.body.password

  const user = await UserModel.findOne({
    username: username,
  })
  if(!user){
    return res.status(401).json({ message: "User does not exist" });
  }
  const passwordmatch = await bcrypt.compare(password,user.password)
  console.log(user)

  if(passwordmatch){
      const token= jwt.sign({
        id: user._id.toString()
      },JWT_SECRET)
      res.json({
        token: token,
      })
  }else{
      res.status(401).json({
        message: "Incorrect credentials"
      })
  }
})

//Adding Content
app.post("/api/v1/content",userMiddleware,async (req,res)=>{
  const { link, type, title } = req.body;
  await ContentModel.create({
      link,
      type,
      title,
      //@ts-ignore
      userId: req.userId,
      tags: []
  });
  res.json({ message: "Content added" });
})

app.get("/api/v1/content",userMiddleware,async(req,res)=>{
  //@ts-ignore
  const userId = req.userId
  const content = await ContentModel.find({userId: userId}).populate("userId","username")
  res.json({content})
})

app.get("/api/v1/content/twitter",userMiddleware,async(req,res)=>{
  //@ts-ignore
  const userId = req.userId
  const content = await ContentModel.find({ userId: userId, type: "twitter" })
      .populate("userId", "username");
  res.json({content})
})

app.get("/api/v1/content/youtube",userMiddleware,async(req,res)=>{
  //@ts-ignore
  const userId = req.userId
  const content = await ContentModel.find({ userId: userId, type: "youtube" })
      .populate("userId", "username");
  res.json({content})
})

app.delete("/api/v1/content",userMiddleware,async(req,res)=>{
  const contentId = req.body.contentId
  // @ts-ignore
  await ContentModel.deleteMany({ _id: contentId, userId: req.userId });
  res.json({ message: "Deleted" });
})

app.post("/api/v1/brain/share",userMiddleware,async(req,res)=>{
  const { share } = req.body;
  if(share){
    //@ts-ignore
    const existingLink = await LinkModel.findOne({userId: req.userId})
    if (existingLink) {
        res.json({ hash: existingLink.hash });
        return;
    }
    const hash = random(10);
    //@ts-ignore
    await LinkModel.create({ userId: req.userId, hash });
    res.json({ hash });
  }
})

app.get("/api/v1/brain/:shareLink",async(req,res)=>{
    const hash = req.params.shareLink
    const link = await LinkModel.findOne({hash: hash})
    if(!link){
      res.status(404).json({message: "Invalid share link"})
      return
    }
    const content = await ContentModel.find({
      userId: link.userId
    })
    const user = await UserModel.findOne({
      _id: link.userId
    })

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({
      //@ts-ignore
      username: user.username,
      content
  });
})

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`) 
})