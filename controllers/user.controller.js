const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e);
        }

    },

    getUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id).lean();

            console.log('_____________________________________________');
            console.log(user);
            console.log('_____________________________________________');

            const normalizedUser = userUtil.userNormalizator(user);

            console.log('______________normalizedUser_______________________________');
            console.log(normalizedUser);
            console.log('______________normalizedUser_______________________________');

            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
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
            res.json(e);
        }
    },

    updateUser: (req, res) => {
        res.json('YODATE USER');
    }
};
