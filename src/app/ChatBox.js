// app/ChatBox.js
import React, { useState } from 'react';
import styles from './ChatBox.module.css'; // Assume you have CSS module for styling

export default function ChatBox({ onSubmit }) {
  const [document, setDocument] = useState('');

  const handleDocumentChange = (event) => {
    setDocument(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(onSubmit) {
      onSubmit(document);
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
          Convert to Text
        </button>
      </form>
    </div>
  );
}
