const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/note_taking_app', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes setup
const noteRoutes = require('./routes/notes');
app.use('/notes', noteRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/notes');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Show all notes
router.get('/', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { notes: notes });
    }
  });
});

// Show form to create a new note
router.get('/new', (req, res) => {
  res.render('new-note');
});

// Add new note to database
router.post('/', (req, res) => {
  const newNote = { title: req.body.title, content: req.body.content };
  Note.create(newNote, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/notes');
    }
  });
});

// Delete a note
router.post('/:id/delete', (req, res) => {
  Note.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/notes');
    }
  });
});

module.exports = router;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/note_taking_app', { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model('Note', noteSchema);
