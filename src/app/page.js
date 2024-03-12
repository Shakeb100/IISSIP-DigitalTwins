// src/pages/page.js (or it might be index.js if it's your homepage)
'use client' //temporary fix 
import React, { useState } from 'react'; 
import ChatBox from './ChatBox'; // Adjust this import if needed
import styles from './page.module.css'; // Ensure this path is correct
export default function Home() {
  const [submittedText, setSubmittedText] = useState('');

  const handleTextSubmit = (text) => {
    // Here you handle the submitted text
    console.log(text); // For debugging
    setSubmittedText(text);
    // You would also send this to your API endpoint here
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>ISSIP Digital Twins</h1>
        <ChatBox onSubmit={handleTextSubmit} />
        {submittedText && (
          <div className={styles.output}>
            <h2>Submitted Text:</h2>
            <p>{submittedText}</p>
          </div>
        )}
      </main>
    </div>
  );
}
