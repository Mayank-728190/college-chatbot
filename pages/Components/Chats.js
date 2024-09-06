import styles from '@/styles/Chats.module.css'
import { BsStars } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import React, { forwardRef, useEffect, useRef } from 'react';


const Chats = ({chat,ref}) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);
  
  return (
    <div ref={chatContainerRef} style={{flex:"1",overflowY:"auto",padding:"0px 20px"}}>
       
       {/* <div >
          
Got it! Here’s a prompt for an article about trees:

Title: The Essential Role of Trees in Our Ecosystem: Beyond Their Beauty

Introduction:
Trees have long been celebrated for their beauty and the shade they provide, but their importance extends far beyond these attributes. As the largest living organisms on Earth, trees play a crucial role in maintaining ecological balance, supporting biodiversity, and improving human health and well-being. This article explores the multifaceted benefits of trees, highlighting their environmental, economic, and social significance.

Body:

Ecological Benefits:

Air Quality Improvement: Trees act as natural air filters by absorbing pollutants like carbon dioxide, sulfur dioxide, and nitrogen oxides. Discuss how urban forests and tree canopies help mitigate air pollution and combat climate change.
Biodiversity Support: Trees provide habitat and food for countless species of birds, insects, and mammals. Explore how different types of trees support various forms of wildlife and contribute to ecosystem diversity.
Economic Advantages:

Property Value Enhancement: Examine how the presence of trees can increase property values and attract homebuyers, citing studies or examples from different regions.
Cost Savings: Highlight the cost savings associated with trees, such as reduced energy bills due to natural cooling and the reduced need for stormwater management infrastructure.
Social and Health Benefits:

Mental Health Improvement: Delve into research showing how green spaces and trees positively impact mental health, reduce stress, and promote relaxation.
Community Well-Being: Discuss how trees contribute to the livability of urban areas by creating attractive public spaces, encouraging outdoor activities, and fostering community interaction.
        </div> */}
        {chat && chat.map((e,index)=>{
            if(index % 2 ==0){
                return <div className={styles.user}>
                    <div>{e}</div>
                    <LuUser2 style={{
              backgroundColor:"var(--input-placeholder-color)",
              // padding:"10px",
              // height:"20px",
              // width:"20px",
              fontSize: "1em",
              // color:"red",
              color:"var(--bg-color)"
              // fill: "url(#gradient)",
            }}/>
                    </div>
            }
            return <div className={styles.bot}>
            <BsStars style={{
              fontSize: "1.8em",
              fill: "url(#gradient)",
            }}/>
            <svg width="0" height="0">
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFC0CB" /> // pink
                <stop offset="100%" stopColor="#ADD8E6" /> // light blue
              </linearGradient>
            </svg>
            <div>{e}</div></div>
        })}
      
    </div>
  )
}

export default Chats
