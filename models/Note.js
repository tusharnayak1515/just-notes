const mongoose = require("mongoose");
const {Schema} = mongoose;

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    folder: {
        type: Schema.Types.ObjectId,
        ref: "Folder"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number,
}, {timestamps: true});

const Note = mongoose.models.Note || mongoose.model("Note", NotesSchema);

module.exports = Note;