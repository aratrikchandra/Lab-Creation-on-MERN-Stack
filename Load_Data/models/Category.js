const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  todo_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Todo',
    required: true,
  },
  category_name: { type: String, required: true },
  color_code: { type: String, default: '#90EE90' } // Light green hex code
});

module.exports = mongoose.model('Category', categorySchema);
