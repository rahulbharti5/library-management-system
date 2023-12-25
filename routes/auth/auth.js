const express = require('express');
const router = express.Router();

const adminAuth = require("./admin/admin_auth");
const studentAuth = require("./student/student_auth");

router.use("/admin",adminAuth);
router.use("/student",studentAuth);

module.exports = router;