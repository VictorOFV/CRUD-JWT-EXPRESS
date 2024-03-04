const multer = require("multer")
const idValidation = require("../../validations/idValidation")

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/avatar")
    },
    filename: (req, file, cb) => {
        const { id } = idValidation.parse(req.params)
        const extension = path.extname(file.originalname);
        cb(null, `AVATAR_${id}${extension}`);
    }
})

const uploadAvatar = multer({ storage: avatarStorage }).single("avatar")

const BannerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/banner")
    },
    filename: (req, file, cb) => {
        const { id } = idValidation.parse(req.params)
        const extension = path.extname(file.originalname);
        cb(null, `BANNER_${id}${extension}`);
    }
})

const uploadBanner = multer({ storage: BannerStorage }).single("banner")


module.exports = { uploadAvatar, uploadBanner }