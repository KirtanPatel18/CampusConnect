
const express = require("express");
const upload = require("../config/multer.js");
const authMiddleware = require("../middleware/authMiddleware.js")

const router = express.Router();

const {getResources, uploadResource} = require("../controllers/resourcesController.js");


router.get("/resources" , getResources );

router.post("/resources", authMiddleware, upload.single("file"), uploadResource);


module.exports = router;
