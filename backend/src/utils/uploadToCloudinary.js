const streamifier = require("streamifier");
const cloudinary = require("../config/clodinary.js");

const uploadToCloudinary = (buffer, folderName, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: "auto",
        public_id: filename,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadToCloudinary;
