const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({ email: req.body.email });

            if (userByEmail) {
                return next({
                    message: 'Email already exist',
                    status: 404
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await User
                .findOne({ email: req.body.email })
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler('Wrong meail or password', 418);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            console.log('_____________________________________');
            console.log(role);
            console.log('_____________________________________');

            if (!roleArr.includes(role)) {
                throw new Error('Access denied');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
