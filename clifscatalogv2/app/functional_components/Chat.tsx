'use client'
import '../globalStyles.css';
import ChatStyles from '../modular_css/Chat.module.css';
import { useChat } from 'ai/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          {message.role}: {message.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className={ChatStyles.form}>
        <label>
          Say something...
          <input
            value={input}
            onChange={handleInputChange}
          />
        </label>
      </form>
    </div>
  )
}