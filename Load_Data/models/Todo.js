const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
    due_date: { type: Date, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);
