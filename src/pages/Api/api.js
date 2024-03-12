export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { prompt } = req.body;
  
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003", // Or any other model you wish to use
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 100,
        }),
      });
  
      const data = await response.json();
  
      res.status(200).json(data);
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  