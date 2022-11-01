const express=require("express")
const Router=express.Router();
const ROLES_LIST=require("../../config/roles_list")
const pendingUserController=require("../../controllers/pendingUserController");
const verifyRoles = require("../../middleware/verifyRoles");
Router.route("/")
    .get(verifyRoles(ROLES_LIST.Admin),pendingUserController.apiGetAllPendingUsers)
    .put(verifyRoles(ROLES_LIST.Admin),pendingUserController.apiApproveUser)
Router.route("/:id")
    .delete(verifyRoles(ROLES_LIST.Admin),pendingUserController.apiDeleteUser)

module.exports=Router