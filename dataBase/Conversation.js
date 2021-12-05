const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }],

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

conversationSchema.pre('find', function() {
    this.populate('members');
});

module.exports = model('conversation', conversationSchema);
