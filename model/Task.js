const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    workingHours: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = Task = mongoose.model('task', taskSchema);
