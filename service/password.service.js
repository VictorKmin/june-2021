const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);
        
        if (!isPasswordMatched) {
            throw new Error('Wrong email or password');
        }
    }
};
