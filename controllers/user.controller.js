const { WELCOME } = require("../configs/email-action.enum");
const User = require('../dataBase/User');
const { emailService, s3Service, userService } = require('../service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {

            const users = await userService.getAllUsers(req.query);
            res.json(users);
        } catch (e) {
            next(e);
        }

    },

    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User
                .findById(user_id);
                // .select('+password')
                // .select('-email')

            // user.randomMethod();
            // User.testStatic(222);

            const normalizedUser = userUtil.userNormalizator(user);

            console.log('______________normalizedUser_______________________________');
            console.log(normalizedUser);
            console.log('______________normalizedUser_______________________________');

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            await emailService.sendMail(req.body.email, WELCOME, { userName: req.body.name });
            
            let newUser = await User.createUserWithHashPassword(req.body);

            if (req.files && req.files.avatar) {
                const uploadInfo = await s3Service.uploadImage(req.files.avatar, 'users', newUser._id.toString());

                newUser = await User.findByIdAndUpdate(newUser._id, { avatar: uploadInfo.Location }, { new: true });
            }

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: (req, res) => {
        res.json('YODATE USER');
    },

    deleteAccount: (req, res, next) => {
        try {
            console.log('****************************************');
            console.log(req.user);
            console.log('****************************************');
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
};
