// src/pages/page.js (or it might be index.js if it's your homepage)
'use client' //temporary fix
import React, { useState } from 'react'; 
import ChatBox from './ChatBox'; // Adjust this import if needed
import styles from './page.module.css'; // Ensure this path is correct

export default function Home() {
  const [generatedSpeech, setGeneratedSpeech] = useState('');

  const handleGeneratedSpeech = (text) => {
    console.log(text); // For debugging
    setGeneratedSpeech(text); // Update the state with the generated speech
  };

  return ( //figure out a way to make it a downloadable speech. 
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

