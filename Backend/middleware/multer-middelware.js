// const multer = require("multer");
// const path = require("path");
// const { generateUniqueId } = require("../utils/generateid");

// // Storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const filename = `${generateUniqueId("propic_")}${ext}`;
//     cb(null, filename);
//   },
// });

// // File type filter
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };

// // Export Multer config (no .single() here)
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// module.exports = upload;

{
  /* dynamic middelware */
}
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { generateUniqueId } = require("../utils/generateid");

// Reusable dynamic storage engine with prefix-based naming
const getMulterMiddleware = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join("uploads", folderName);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      let prefix = "";

      // Optional: infer prefix based on folderName
      if (folderName === "profile") prefix = "profile_";
      else if (folderName === "bookimage") prefix = "bookimg_";

      const uniqueName = generateUniqueId(prefix) + ext;
      cb(null, uniqueName);
    },
  });

  return multer({ storage });
};

module.exports = getMulterMiddleware;
