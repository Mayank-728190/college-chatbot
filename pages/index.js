import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Sidebar from "./Components/Sidebar";
import Prompt from "./Components/Prompt";
import { RxHamburgerMenu } from "react-icons/rx";
import Chats from "./Components/Chats";
import { useState, useRef } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [chat, setChat] = useState(["1","2","3","Got it! Here’s a prompt for an article about trees: Title: The Essential Role of Trees in Our Ecosystem: Beyond Their Beauty Introduction: Trees have long been celebrated for their beauty and the shade they provide, but their importance extends far beyond these attributes. As the largest living organisms on Earth, trees play a crucial role in maintaining ecological balance, supporting biodiversity, and improving human health and well-being. This article explores the multifaceted benefits of trees, highlighting their environmental, economic, and social significance. Body: Ecological Benefits: Air Quality Improvement: Trees act as natural air filters by absorbing pollutants like carbon dioxide, sulfur dioxide, and nitrogen oxides. Discuss how urban forests and tree canopies help mitigate air pollution and combat climate change. Biodiversity Support: Trees provide habitat and food for countless species of birds, insects, and mammals. Explore how different types of trees support various forms of wildlife and contribute to ecosystem diversity. Economic Advantages: Property Value Enhancement: Examine how the presence of trees can increase property values and attract homebuyers, citing studies or examples from different regions. Cost Savings: Highlight the cost savings associated with trees, such as reduced energy bills due to natural cooling and the reduced need for stormwater management infrastructure. Social and Health Benefits: Mental Health Improvement: Delve into research showing how green spaces and trees positively impact mental health, reduce stress, and promote relaxation. Community Well-Being: Discuss how trees contribute to the livability of urban areas by creating attractive public spaces, encouraging outdoor activities, and fostering community interaction."])

  const chatRef = useRef(null);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{display:"flex",maxWidth:"100vw"}}>
     <Sidebar style={{flex:"1",position:"fixed",top:"0px",left:"0px"}}></Sidebar>
     <div style={{background:"var(--bg-color)",flex:"1",height:"100%"}}>

      
      <div>

      </div>
      <div style={{display:"flex",height:"100svh",flexDirection:"column",
        justifyContent:"space-between"
      }}>
        <h1 className={styles.h1} style={{paddingTop:"12px",paddingBottom:"5px"}}>Vinayaka</h1>
        <Chats chat={chat} ref={chatRef}></Chats>
        
        <Prompt style={{flex:"1"}} setChat={setChat} chat={chat} chatRef={chatRef}></Prompt>
      </div>
</div>
     </div>
    </>
  );
}
