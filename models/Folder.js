const mongoose = require("mongoose");
const {Schema} = mongoose;

const FolderSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number
},{timestamps: true});

const Folder = mongoose.models.Folder || mongoose.model("Folder", FolderSchema);

module.exports = Folder;