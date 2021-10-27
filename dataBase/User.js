const { Schema, model } = require('mongoose');

const userRoles = require('../configs/user-roles.enum');
const passwordService = require("../service/password.service");
const MD = require("./ModelDefinition");

const userSchema = new Schema({
    ...MD.NEP,
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    age: {
        type: Number,
    },
    avatar: {
        type: String
    }
}, MD.gentelmenClub);

userSchema.virtual('fullName').get(function() {
    return `${this.name} ${this.role} HA-HA`;
});

userSchema.methods = { // just for single record
    randomMethod() {
        console.log('**********************************************');
        console.log(this);
        console.log('**********************************************');
    },

    comparePassword(password) {
        return passwordService.compare(password, this.password);
    }
};

userSchema.statics = {
    testStatic(msg) {
        console.log('*******************');
        console.log('TEST STATIC', msg);
        console.log('TEST STATIC', msg);
        console.log('*******************');
    },

    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({ ...userObject, password: hashedPassword });
    }
};

module.exports = model('user', userSchema);

