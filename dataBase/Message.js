const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    conversation: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'conversation'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

messageSchema.pre('find', function() {
    this.populate('user');
});

module.exports = model('message', messageSchema);
