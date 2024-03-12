// src/pages/page.js (or it might be index.js if it's your homepage)
'use client' //temporary fix
import React, { useState } from 'react'; 
import ChatBox from './ChatBox'; // Adjust this import if needed
import styles from './page.module.css'; // Ensure this path is correct

export default function Home() {
  const [generatedSpeech, setGenerationSpeech] = useState('');

  const handleGeneratedSpeech = (text) => {
    // Here you handle the submitted text
    console.log(text); // For debugging
    setSubmittedText(text);
    // You would also send this to your API endpoint here
  };
  return (
    <div>
      <h1>ISSIP Digital Twin</h1>
      <ChatBox onGeneratedSpeech={handleGeneratedSpeech} />
      {generatedSpeech && (
        <div>
          <h2>Generated Speech:</h2>
          <p>{generatedSpeech}</p>
        </div>
      )}
    </div>
  );
}

