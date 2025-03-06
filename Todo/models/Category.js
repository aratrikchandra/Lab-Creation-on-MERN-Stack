const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_id: { type: Number, required: true, unique: true },
  todo_id: {
    type: Number,
    ref: 'Todo',
    required: true,
  },
  category_name: { type: String, required: true },
  color_code: { type: String, default: '#90EE90' } // Light green hex code
});

module.exports = mongoose.model('Category', categorySchema);
