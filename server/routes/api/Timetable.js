const express = require('express');
const router = express.Router();
const ClassController = require('../../controllers/ClassController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
router.route('/')
    .get(ClassController.getAllTables)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher),ClassController.createNewTable)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), ClassController.updateTable)
    

router.route("/pending")
    .get(verifyRoles(ROLES_LIST.Admin),ClassController.getAllPendingTimetables)
router.route("/:id")
    .get(ClassController.getOneTable)
    .delete(verifyRoles(ROLES_LIST.Admin), ClassController.deleteTable);
module.exports = router;