const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Add a new question
router.post('/add', async (req, res) => {
  const { questionText, options, correctAnswer, explanation, category, difficulty } = req.body;
  console.log('Incoming request data:', req.body); // Log incoming data
  try {
    const question = new Question({ questionText, options, correctAnswer, explanation, category, difficulty });
    await question.save();
    res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    console.log('Error adding question: ', error);
    res.status(500).json({ error: 'Failed to add question' });
  }
});

module.exports = router;
