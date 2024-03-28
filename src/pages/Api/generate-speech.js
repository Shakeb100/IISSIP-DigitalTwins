import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      // add our text(notes) to written speech prompt. 
      const prompt = `You will be given a research paper or speaker notes, and a title from which you should write.
      Your goal is to generate a professional and academically oriented script suitable for a presentation about that paper, from the perspective provided.
      The presentation aims to provide a comprehensive overview of the subject matter to an audience with varying levels of familiarity. Please ensure that the script is structured logically, 
      includes relevant key points, incorporates clear explanations, and maintains a formal tone throughout. The script should primarily use language from the research paper, and only make changes that adapt the research paper to be spoken rather than written, 
      and changes that clarify definitions or jargon to be more approachable for a general audience. The script should not have any slash options and it should be able to be read exactly as written. Return the speech and all it's paragraphs in one query, make sure the paragraphs are spaced out. The script should follow this format: 
      
      Paragraph 1 (OPENING): Here you should write a sentence or two where the speaker introduces their name, the title of the paper they will be presenting on, and possibly information about their perspective. You cannot make up any information about the perspective. Only use information that is directly included as perspective information. 
      
      Paragraph 2 (INTRODUCTION): Here you should introduce the topic of the speech and an overview of the main body points. 
      
      Paragraph 3 (BODY 1): Here you should give information about the first topic 
      
      Paragraph 4 (BODY 2): Here you should give information about the second topic 
      
      Paragraph 5 (BODY 3): Here you should give information about the third topic 
      
      Paragraph 6 (CONCLUSION): Here you should summarize the speech and thank the audience for listening. :\n\n${text}`; //temporary prompt

      // Send the prompt to the GPT-3 API to generate speech
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', //gpt model being used 
        {
          prompt: prompt,
          max_tokens: 600,
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
