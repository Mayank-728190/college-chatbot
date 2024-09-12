// SpeechRecognitionComponent.js
import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

// Check if SpeechRecognition is available
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const SpeechRecognitionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Voice Command:', transcript); // Add your command handling logic here
      };

      recog.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopRecognition();
      };

      setRecognition(recog);
    } else {
      console.warn('SpeechRecognition is not supported in this browser.');
    }
  }, []);

  const startRecognition = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={isListening ? stopRecognition : startRecognition}
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '20px',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        outline: 'none',
        border: 'none',
        background: isListening ? 'var(--button-disable)' : 'var(--button-enable)',
        color: 'var(--button-color)',
        fontSize: '1.2em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
    </button>
  );
};

export default SpeechRecognitionComponent;
