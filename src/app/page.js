// src/pages/page.js (or it might be index.js if it's your homepage)
'use client' //temporary fix
import React, { useState } from 'react'; 
import ChatBox from './ChatBox'; // Adjust this import if needed
import styles from './page.module.css'; // Ensure this path is correct

export default function Home() {
  const [generatedSpeech, setGeneratedSpeech] = useState('');
  const [videoIndex, setVideoIndex] = useState(0);

  const videoUrls = [
    'https://studio.d-id.com/share?id=512bb228c65daf07965ca825f19072c6&utm_source=copy', //temporary for demo
    'https://studio.d-id.com/share?id=0a65f456f8dcf53637bb22b3f0a5b865&utm_source=copy',
    // Add more video URLs as needed
  ];

  const playVideo = () => {
    const video = document.getElementById('videoPlayer');
    video.play();
  };

  const handleGeneratedSpeech = (text) => {
    console.log(text); // For debugging
    setGeneratedSpeech(text); // Update the state with the generated speech
  };

  const handleNextVideo = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  return (
    <div>
      <h1 className={styles.center}>ISSIP Digital Twin</h1>
      <header className={styles.Header}>
        <p className={styles.headerSubtitle}>
          Explore the Future with ISSIP's Digital Twin Technology. Get Started Now!
        </p>
      </header>

      {/* Render ChatBox only if generatedSpeech is not set */}
      {!generatedSpeech && <ChatBox onGeneratedSpeech={handleGeneratedSpeech} />}

      {/* Once generatedSpeech is set, display the generated content and Next Video button */}
      {generatedSpeech && (
        <div>
          <h2>Your Digital Twin</h2>
          <iframe
            id="videoPlayer"
            width="600"
            height="500"
            src={videoUrls[videoIndex]}
            title="Embedded Video"
            frameBorder="5"
            allowFullScreen
          ></iframe>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1px' }}>
          <input 
          type="text"
          placeholder="Paste your text here..."
          style={{ padding: '10px', width: '300px' }} // Adjust the padding and width as needed
          />
            <button>Generate Speech</button>
        </div>
        </div>
      )}

      <footer className={styles.footer}></footer>
    </div>
  );
}
