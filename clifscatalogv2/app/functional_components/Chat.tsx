"use client";
import "../globalStyles.css";
import ChatStyles from "../modular_css/Chat.module.css";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <section className={ChatStyles.container}>
      <div className={ChatStyles.messagesContainer}>
        {messages.length < 1 && 
        <div className={ChatStyles.noMessages}>
          <h4>Enter anything below...</h4>
          <p>Example: "Give me a list of 5 Mexican
          dishes that do not contain dairy"</p>
          <ul className={ChatStyles.emojis}>
            <li>🍎</li>
            <li>🍔</li>
            <li>🍲</li>
          </ul>
        </div>}
        {messages.map((message) => (
          <div key={message.id} className={ChatStyles.messages}>
            {message.role}: {message.content}
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
          onChange={handleInputChange}
        />
      </form>
    </section>
  );
}
