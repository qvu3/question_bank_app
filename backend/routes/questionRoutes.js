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

// Update question
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = req.body;

    // Log the ID and the data to be updated
    console.log('Update request received for ID:', id);
    console.log('Update data:', updatedQuestion);

    const question = await Question.findByIdAndUpdate(id, updatedQuestion, { new: true });

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Failed to update question' });
  }
});

// Delete a question
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Delete request received for ID:', id);
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

module.exports = router;
