import multer from "multer";
import path from "path";

// نحدد مكان حفظ الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    // نخلي اسم الملف مميز
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// نقبل بس الصور
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

export const upload = multer({ storage, fileFilter });
