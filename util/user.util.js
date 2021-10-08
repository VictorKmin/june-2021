module.exports = {
    userNormalizator: (userToNormalize = {}) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};
