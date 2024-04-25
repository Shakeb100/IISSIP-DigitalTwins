import React, { useState } from 'react';
import axios from 'axios';
import styles from './ChatBox.module.css';

export default function ChatBox({ onGeneratedSpeech }) {
  const [textContent, setTextContent] = useState(''); // Renamed from 'document'
  const [generatedSpeech, setGeneratedSpeech] = useState('');

  const handleDocumentChange = (event) => {
    setTextContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/generate-speech', { text: textContent });
      const speech = response.data.speech;
      
      // Update the state with the generated speech
      setGeneratedSpeech(speech);

      // Pass the generated speech back to the parent component if needed
      if (onGeneratedSpeech) {
        onGeneratedSpeech(speech);
      }
    } catch (error) {
      console.error('Error generating speech:', error);
      // Optionally handle the error here, e.g., show a message to the user
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <textarea
  placeholder="Paste your text here..."
  value={textContent}
  onChange={handleDocumentChange}
  style={{ padding: '10 px', width: '300px', height: '80px' }} // Adjust the height as needed
/>

        <button type="submit">Generate Speech</button>
      </form>
   </div> 
  );
}
