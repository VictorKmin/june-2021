const { Schema, model } = require('mongoose');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

}, );

oAuthSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model('o_auth', oAuthSchema);


// pm.test("Status code is 200", function () {
//     pm.response.to.have.status(200);
// });
//
//
// const jsonBody = JSON.parse(responseBody);
//
// pm.environment.set("access_token", jsonBody.access_token);
// pm.environment.set("refresh_token", jsonBody.refresh_token);
