const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: Array, required: true },
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  category: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
});

module.exports = mongoose.model('Question', QuestionSchema);
