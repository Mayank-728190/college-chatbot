import React, { useEffect, useRef } from 'react';
import { BsStars } from 'react-icons/bs';
import { LuUser2 } from 'react-icons/lu';
import styles from '@/styles/Chats.module.css';

const Chats = ({ chat, setPrompt }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const ques = [
    'What is the admission process of Government Girls College Ajmer (GGCA)',
    'Which college provides better facilities Government College, Pushkar or Government College, Arain',
    'Contact information and fees structure of Shri Govind Singh Gurjar Rajkiya Mahavidyalaya'
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
            alignItems: 'center'
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
                      fill: 'url(#gradient)'
                    }}
                  />
                  <svg width="10px" height="0">
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFC0CB" /> {/* pink */}
                      <stop offset="100%" stopColor="#ADD8E6" /> {/* light blue */}
                    </linearGradient>
                  </svg>
                </div>
                <div style={{ fontSize: '.9em', color: 'gray' }}>{e}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {chat &&
        chat.map((e, index) => {
          if (index % 2 === 0) {
            return (
              <div key={index} className={styles.user}>
                <div>{e}</div>
                <LuUser2
                  style={{
                    backgroundColor: 'var(--input-placeholder-color)',
                    fontSize: '1em',
                    color: 'var(--bg-color)'
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
                  fill: 'url(#gradient)'
                }}
              />
              <svg width="0" height="0">
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFC0CB" /> {/* pink */}
                  <stop offset="100%" stopColor="#ADD8E6" /> {/* light blue */}
                </linearGradient>
              </svg>
              {e === '...' ? (
                <div>
                  <div className={styles.loader}></div>
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: e.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
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
