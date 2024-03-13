import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      // Construct the prompt
      const prompt = `Convert the following text into speech:\n\n${text}`;

      // Send the prompt to the GPT-3 API to generate speech
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions',
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
    
    catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
