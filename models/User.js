const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ],
    createdAt: Number,
    updatedAt: Number,
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;