const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');
const tokenTypeEnum = require('../configs/token-type.enum');
const ErrorHandler = require('../errors/ErrorHandler');
const {FORGOT_PASSWORD} = require("../configs/action-token-type.enum");

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            const secret = tokenType === tokenTypeEnum.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = 'HELLO'; // TODO from config
                break;
            default:
                throw new ErrorHandler('Wrong token type', 500);
        }

        return jwt.sign({}, secretWord, { expiresIn: '24h' });
    }
};
