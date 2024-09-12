import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CiLight, CiDark } from 'react-icons/ci';

// Check if SpeechRecognition is available
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Sidebar = ({ chat }) => {
  const [toggle, setToggle] = useState(false);
  const [mode, setMode] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedMode = localStorage.getItem('mode');
      if (savedMode !== null) {
        setMode(savedMode === 'true');
      } else {
        setMode(window.matchMedia('(prefers-color-scheme: light)').matches);
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      document.documentElement.setAttribute('data-color-scheme', mode ? 'light' : 'dark');
      localStorage.setItem('mode', mode);
    }
  }, [mode, isInitialized]);

  useEffect(() => {
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (transcript.includes('toggle sidebar')) {
          setToggle((prev) => !prev);
        } else if (transcript.includes('switch theme')) {
          setMode((prev) => !prev);
        }
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

  const changeMode = () => {
    setMode((prevMode) => !prevMode);
  };

  return (
    <div style={{ position: 'relative', width: toggle ? '200px' : '80px' }}>
      <div
        style={{
          background: 'var(--bg-color)',
          width: toggle ? '200px' : '80px',
          transition: '.2s',
          height: '100svh',
          position: 'fixed',
          top: '0px',
          left: '0px',
        }}
      >
        <button
          style={{
            position: 'relative',
            marginLeft: '10px',
            color: 'var(--font-color)',
            marginTop: '10px',
            padding: '8px 10px',
            fontSize: '1.8em',
            background: 'transparent',
            outline: 'none',
            border: 'none',
          }}
          onClick={() => setToggle(!toggle)}
        >
          <RxHamburgerMenu />
        </button>

        {toggle && (
          <div>
            {chat[0] && `${chat[0].substring(0, 20)}${chat[0].length === 23 ? chat[0].substring(20, 23) : '...'}`}
          </div>
        )}

        <div style={{ position: 'absolute', bottom: '40px', left: '20px' }}>
          <button
            style={{
              fontSize: '1.8em',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--font-color)',
            }}
            onClick={changeMode}
          >
            {!mode ? <CiLight /> : <CiDark />}
          </button>
        </div>

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
      </div>
    </div>
  );
};

export default Sidebar;
