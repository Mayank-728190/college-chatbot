import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import styles from '@/styles/Prompt.module.css';

// Check if SpeechRecognition is available
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Prompt = ({ chat, setChat, chatRef, prompt, setPrompt }) => {
  const [disabled, setDisabled] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    setDisabled(prompt === '');
  }, [prompt]);

  useEffect(() => {
    if (generating) {
      setDisabled(true);
    }
  }, [generating, disabled]);

  useEffect(() => {
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
      };

      recog.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        stopRecognition();
      };

      setRecognition(recog);
    } else {
      console.warn("SpeechRecognition is not supported in this browser.");
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

  const enterPrompt = async (e) => {
    e.preventDefault();
    setChat((prevChat) => [...prevChat, prompt, '...']);
    setPrompt('');
    setDisabled(true);
    setGenerating(true);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: prompt,
          memory: chat.slice(-10).filter((e, i) => i % 2 === 0),
        }),
      });
      const data = await response.json();
      console.log(data);
      try {
        setChat((prevChat) => [...prevChat.slice(0, -1), data.data.response]);
      } catch (err) {
        console.error(err);
      }
      setGenerating(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          background: 'var(--bg-color)',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          paddingBottom: '18px',
          paddingTop: '20px',
        }}
      >
        <div
          style={{
            width: '98%',
            background: 'var(--prompt-color)',
            borderRadius: '500px',
            padding: '0px',
            overflow: 'hidden',
            position: 'relative',
            paddingRight: '4px',
          }}
        >
          <form onSubmit={enterPrompt} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              className={styles.input}
              style={{
                color: 'var(--input-color)',
                outline: 'none',
                border: 'none',
                background: 'transparent',
                fontSize: '1em',
                padding: '14px 20px',
                border: 'none',
                width: '100%',
              }}
              placeholder="Enter the message"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              value={prompt}
            />
            <button
              type="submit"
              disabled={disabled}
              style={{
                width: '45px',
                height: '40px',
                borderRadius: '50%',
                marginRight: '10px',
                outline: 'none',
                border: 'none',
                background: disabled ? 'var(--button-disable)' : 'var(--button-enable)',
                color: 'var(--button-color)',
                fontSize: '1.2em',
                fontWeight: '900',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <FaArrowUp />
            </button>
            <button
              type="button"
              onClick={isListening ? stopRecognition : startRecognition}
              style={{
                width: '45px',
                height: '40px',
                borderRadius: '50%',
                outline: 'none',
                border: 'none',
                background: isListening ? 'var(--button-disable)' : 'var(--button-enable)',
                color: 'var(--button-color)',
                fontSize: '1.2em',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                marginLeft: '10px',
              }}
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
