const User = require('../dataBase/User');
const { ADMIN } = require('../configs/user-roles.enum');

module.exports = async () => {
    const user = await User.findOne({ role: ADMIN });

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Alona',
            email: 'alona.admin@site.com',
            password: 'Hello_Wordl1!',
            role: ADMIN
        });
    }
};
