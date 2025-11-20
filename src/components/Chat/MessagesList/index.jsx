import { useRef, useEffect } from 'react'
import Message from '../Message'
import './index.css'

const MessagesList = ({ messages, onCopy, onRegenerate, isTyping }) => {
  const messagesEndRef = useRef(null)
  
  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])
  
  return (
    <div className="message-list-container">
      <div className="messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onCopy={onCopy}
            onRegenerate={onRegenerate}
          />
        ))}
        
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-bubble">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default MessagesList