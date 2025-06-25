const prisma = require("../config/db.js");
const uploadToCloudinary = require("../utils/uploadToCloudinary.js");
const filesize = require("filesize").default;

const getResources = async (req, res) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json({ success: true, resources }); // send the resources as JSON response
  } catch (error) {
    console.error("error in getResources:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const uploadResource = async (req, res) => {
  try {
    const file = req.file;
    
    const { title, description, categoryId, category} = req.body;

    if (!file) return res.status(400).json({ error: "File is required" });

    const cloudResult = await uploadToCloudinary(
      file.buffer,
      "campus-resources",
      file.originalname.split(".")[0]
    );

    const uploader = req.userId;
    const fileSize = file.size.toString(); 

    const newResource = await prisma.resource.create({
      data: {
        title,
        description,
        categoryId,
        category,
        fileType: file.mimetype,
        fileSize, // e.g., "2.4 MB"
        fileUrl: cloudResult.secure_url,
        uploaderId:uploader,
      },
    });

    res.status(201).json({ message: "Resource uploaded", resource: newResource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};

module.exports = { getResources, uploadResource };
