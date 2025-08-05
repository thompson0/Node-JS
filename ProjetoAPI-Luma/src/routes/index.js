import express from "express"
import  pecas  from "../routes/pecasRoutes.js"

const routes = (app) => {
  app.route("/").get((req,res)=> res.status(200).send("luma"))
  
  app.use(express.json()); 
  app.use(express.static("public"))
  app.use(pecas); 
 
}

export default routes