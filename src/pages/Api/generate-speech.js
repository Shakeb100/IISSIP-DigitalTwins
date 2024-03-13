import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      // add our text(notes) to written speech prompt. 
      const prompt = `Your job will be to take text given to you, whether that be bulletpoints, notes, paragraphs and transorm the content
      into a speech that someone can present:\n\n${text}`; //temporary prompt

      // Send the prompt to the GPT-3 API to generate speech
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', //gpt model being used 
        {
          prompt: prompt,
          max_tokens: 150,
        },
        {

          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Return the generated speech to the client
      res.status(200).json({ speech: openaiResponse.data.choices[0].text });
    } 
    
    catch (error) { //error handing to test in console
      if (error.response) {
        console.error(error.response.data); // This will log the OpenAI error
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      console.error(error.config);
      res.status(500).json({ error: error.message });
    }
  }
}
