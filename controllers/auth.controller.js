const User = require('../dataBase/User');
const O_Auth = require('../dataBase/O_Auth');
const ActionToken = require('../dataBase/ActionToken');
const {userNormalizator} = require('../util/user.util');
const {jwtService, emailService} = require('../service');
const ErrorHandler = require("../errors/ErrorHandler");
const ActionTokenTypeEnum = require("../configs/action-token-type.enum");
const EmailActionEnum = require("../configs/email-action.enum");
const {AUTHORIZATION} = require("../configs/constants");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            await user.comparePassword(req.body.password);

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler('User not found', 404);
            }

            const actionToken = jwtService.generateActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: ActionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                EmailActionEnum.FORGOT_PASSWORD,
                { forgotPasswordUrl: `http://localhost:3000/passwordForgot?token=${actionToken}`});

            res.json('Ok');
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: (req, res, next) => {
        try {
            const actionToken = req.get(AUTHORIZATION);
            console.log(req.body);

            console.log(actionToken);

            res.json('GOOOOOOD');
        } catch (e) {
            next(e);
        }
    },
};
