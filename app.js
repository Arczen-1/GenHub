const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const OpenAI = require ("openai");

const databaseUrl = process.env.apiKey;
const openai = new OpenAI({
  organization: 'org-zwpIPRGGdZ3bDZMGwFLu3XEN',
  apiKey: databaseUrl
});

const app = express();
const port = 3000;


const apiKey = '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';


app.set('view engine', 'hbs');


app.set('views', path.join(__dirname, 'views'));


hbs.registerPartials(path.join(__dirname, 'views', 'partials'));


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());


app.get('/', (req, res) => {

  res.render('index');
});


app.get('/results', (req, res) => {

  const generatedResults = req.query.generatedResults;

  res.render('results', { generatedResults: generatedResults ? generatedResults.split('\n') : [] });
});



app.post('/generate-text', async (req, res) => {
  try {
    const { keywords } = req.body;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Generate me creative business name according to these keywords:" +keywords}],
      model: "gpt-3.5-turbo",
      max_tokens:100,
    });

    const generatedText = completion.choices[0].message.content;
    console.log(generatedText);
    res.json({ generatedText });

  }catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'Error generating text' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
