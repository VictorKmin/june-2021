const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({ email: req.body.email });

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
