// app/ChatBox.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './ChatBox.module.css';

export default function ChatBox({ onGeneratedSpeech }) {
  const [document, setDocument] = useState('');

  const handleDocumentChange = (event) => {
    setDocument(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/generate-speech', { text: document });
      onGeneratedSpeech(response.data.speech); // Call the prop with the generated speech
    } catch (error) {
      console.error('Error generating speech:', error);
      // Optionally handle the error here, e.g., by setting an error state
    }
  };

  return (
    <div className={styles.chatBox}>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textArea}
          placeholder="Paste your document here..."
          value={document}
          onChange={handleDocumentChange}
        />
        <button className={styles.submitButton} type="submit">
          Convert to Speech
        </button>
      </form>
    </div>
  );
}

