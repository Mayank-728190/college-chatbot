import styles from '@/styles/Chats.module.css';
import { BsStars } from 'react-icons/bs';
import { LuUser2 } from 'react-icons/lu';
import React, { useEffect, useRef, useState } from 'react';

// Check if SpeechRecognition is available
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Chats = ({ chat, setPrompt }) => {
  const chatContainerRef = useRef(null);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = 'en-US';

      recog.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        if (event.results[0].isFinal) {
          setPrompt(transcript);
        }
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

  const ques = [
    'What is the admission process of Government Girls College Ajmer (GGCA)',
    'Which college provides better facilities: Government College, Pushkar or Government College, Arain',
    'Contact information and fees structure of Shri Govind Singh Gurjar Rajkiya Mahavidyalaya',
  ];

  return (
    <div ref={chatContainerRef} style={{ flex: '1', overflowY: 'auto', padding: '0px 20px' }}>
      {chat && chat.length < 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            height: '100%',
            textAlign: 'center',
            paddingBottom: '60px',
            alignItems: 'center',
          }}
        >
          <h2 style={{ maxWidth: '80%' }}>Ask any query related to any college in Rajasthan</h2>
          <div className={styles.queslinks}>
            {ques.map((e, i) => (
              <div className={styles.ques} key={i} onClick={() => setPrompt(e)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BsStars
                    style={{
                      fontSize: '2em',
                      fill: 'url(#gradient)',
                    }}
                  />
                </div>
                <div style={{ fontSize: '.9em', color: 'gray' }}>{e}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gradient definition moved outside */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFC0CB" /> {/* pink */}
            <stop offset="100%" stopColor="#ADD8E6" /> {/* light blue */}
          </linearGradient>
        </defs>
      </svg>

      <button onClick={isListening ? stopRecognition : startRecognition}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>

      {chat && chat.map((e, index) => {
        if (index % 2 === 0) {
          return (
            <div key={index} className={styles.user}>
              <div>{e}</div>
              <LuUser2
                style={{
                  backgroundColor: 'var(--input-placeholder-color)',
                  fontSize: '1em',
                  color: 'var(--bg-color)',
                }}
              />
            </div>
          );
        }
        return (
          <div key={index} className={styles.bot}>
            <BsStars
              style={{
                fontSize: '1.8em',
                fill: 'url(#gradient)',
              }}
            />
            {e === '...' ? (
              <div>
                <div className={styles.loader}></div>
              </div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: e.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'),
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
