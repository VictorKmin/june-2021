const {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE} = require("../configs/constants");
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(`Not supported format`, 400);
            }

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(`File ${name} is too big`, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
