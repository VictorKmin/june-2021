module.exports = {
    gentelmenClub: { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
    NEP: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            // select: false
        },
    }
};
