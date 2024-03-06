const multer = require("multer")
const path = require("node:path")

function createStorage(destination) {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `public/${destination}`)
        },
        filename: (req, file, cb) => {
            const extension = path.extname(file.originalname);
            cb(null, `${file.fieldname.toUpperCase()}_${Date.now()}${extension}`);
        }
    });
}

function createUploadMiddleware(storage, ...fieldNames) {
    return multer({ storage: storage }).fields(
        fieldNames.map(fieldName => ({ name: fieldName, maxCount: 1 }))
    );
}

const uploadAvatarAndBanner = createUploadMiddleware(createStorage("users_images"), "avatar", "banner");
const uploadChecklistIcon = createUploadMiddleware(createStorage("checklist_icons"), "icon")

module.exports = { uploadAvatarAndBanner, uploadChecklistIcon }