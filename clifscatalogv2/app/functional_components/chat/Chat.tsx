"use client";
import { useContext, useEffect, useState } from "react";
import "../../globalStyles.css";
import ChatStyles from "../../modular_css/Chat.module.css";
import { useChat } from "ai/react";
import { ThemeContext } from "@/app/store/ThemeProvider";
import { Session } from "next-auth";
import { getUserProfile } from "../user_profile/getUserProfile";

interface Props {
  session: Session | null;
}

export default function Chat(props:Props) {
  const theme = useContext(ThemeContext);
  const [preferencesToSend, setPreferencesToSend] = useState(null);

  async function getUserPreferences(session: Session) {
    const userProfile = await getUserProfile(session.user.id, session.user.accessToken);
    const userPreferences = userProfile[0].preferences;

    // Extract the object from the array and filter its keys based on truthy boolean values
    const selectedPreferences = Object.keys(userPreferences[0]).filter(key => {
      const preferenceValue = userPreferences[0][key];
        
      return typeof preferenceValue === "boolean" && preferenceValue;
    });

    //ensures that there is atleast one preference selected, otherwise return null
    if(selectedPreferences.length > 0) {
      return Promise.all(selectedPreferences);  
    }

    return null;
  }
  
  useEffect(() => {
    if (props.session) {
      getUserPreferences(props.session)
        .then((preferences) => {
          setPreferencesToSend(preferences);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error fetching preferences:", error);
        });
    }
  }, [props.session]);

  //Checks if there is a session valid, and if there is sends the user preferences as the body of the chat hook (if there are userPreferences selected)
  const { messages, input, handleInputChange, handleSubmit } = useChat(props.session && preferencesToSend !== null ? {
    body: {
      preferences: preferencesToSend,
    },
  } : { body: null }
);

  return (

    <section className={props.session === null ? "container_light_chat" : theme.themeValue+"_chat"} id={ChatStyles.container}>
      <div className={ChatStyles.messagesContainer}>
        {messages.length < 1 && 
        <div className={ChatStyles.noMessages}>
          <h4>Enter anything below...</h4>
          <p>Example: Give me a list of 5 Mexican
          dishes that do not contain dairy</p>
          <ul className={ChatStyles.emojis}>
            <li>🍎</li>
            <li>🍔</li>
            <li>🍲</li>
          </ul>
        </div>}
        {messages.map((message) => (
          <div key={message.id} className={ChatStyles.messages}>
            <p className={ChatStyles.role}>{message.role}:</p> <p className={ChatStyles.content}>{message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={ChatStyles.form}>
        <label htmlFor="inputGPT">
          Chat here:
        </label>
        <input
          placeholder="Start typing here..."
          id="inputGPT"
          value={input}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
