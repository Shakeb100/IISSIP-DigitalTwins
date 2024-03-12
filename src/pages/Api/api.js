import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt: text,
          max_tokens: 150,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json({ speech: openaiResponse.data.choices[0].text });
    } catch (error) {
      console.error('Error generating speech:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

  