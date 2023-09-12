"use client";
import { useContext } from "react";
import "../../globalStyles.css";
import ChatStyles from "../../modular_css/Chat.module.css";
import { useChat } from "ai/react";
import { ThemeContext } from "@/app/store/ThemeProvider";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

export default function Chat(props:Props) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const theme = useContext(ThemeContext);

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
      </form>
    </section>
  );
}
