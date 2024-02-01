const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;


const apiKey = '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';

// Set the view engine to Handlebars
app.set('view engine', 'hbs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Register partials directory (optional)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Serve static files from the public directory (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming JSON requests
app.use(bodyParser.json());

// Define a simple route
app.get('/', (req, res) => {
  // Render the 'index' view with a variable
  res.render('index');
});

// Handle the /results route
app.get('/results', (req, res) => {
  // Get the generated results from the query parameter
  const generatedResults = req.query.generatedResults;

  // Render the results.hbs file with the generated results
  res.render('results', { generatedResults: generatedResults ? generatedResults.split('\n') : [] });
});



app.post('/generate-text', async (req, res) => {
  try {
    const { keywords } = req.body;

    // Use axios to make a POST request to the OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/engines/	gpt-3.5-turbo-instruct/completions',
      {
        prompt: "Generate creative business names related to the keyword:" + keywords,
        max_tokens: 100
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // Extract the generated text from the response
    const generatedText = response.data.choices[0].text;

    // Send the generated text as a JSON response
    res.json({ generatedText });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'Error generating text' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
