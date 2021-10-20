const { WELCOME } = require("../configs/email-action.enum");
const User = require('../dataBase/User');
const { emailService } = require('../service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

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
            console.log('*************************************************');
            console.log(req.body);
            console.log('*************************************************');
            
            await emailService.sendMail(req.body.email, WELCOME, { userName: req.body.name });
            
            const newUser = await User.createUserWithHashPassword(req.body);

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
