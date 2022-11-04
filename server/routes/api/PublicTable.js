const express=require('express')
const Router=express.Router();
const ClassController=require("../../controllers/ClassController")
const userController=require("../../controllers/usersController")
Router.route("/tables")
    .get(ClassController.getAllTables)
Router.route("/tables/:id")
    .get(ClassController.getOneTable)
Router.route("/teachers")
    .get(userController.getTeachers)
Router.get("user/:id")
    .get(userController.getUser)
module.exports=Router   