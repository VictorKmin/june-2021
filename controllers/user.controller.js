const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
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
                .findById(user_id)
                // .select('+password')
                // .select('-email')
                .lean();

            // isPasswordMatched()

            console.log('_____________________________________________');
            console.log(user);
            console.log('_____________________________________________');

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
            
            const hashedPassword = await passwordService.hash(req.body.password);

            console.log('_____hashedPassword_____');
            console.log(hashedPassword);
            console.log('_____hashedPassword_____');
            
            
            const newUser = await User.create({ ...req.body, password: hashedPassword });

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
