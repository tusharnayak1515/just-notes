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
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number,
}, {timestamps: true});

const Note = mongoose.models.Note || mongoose.model("Note", NotesSchema);

module.exports = Note;