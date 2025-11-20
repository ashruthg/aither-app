import { useChat } from '../../context/ChatContext'
import { IoChatbox } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import './index.css'

const NewChat = () => {
  const { createNewConversation } = useChat()

  const handleStartChat = () => {
    createNewConversation()
  }

  return (
    <div className="new-chat-container">
      <div className="new-chat-content">
        <div className="chat-icon"><IoChatbox /></div>
        
        <h2 className="new-chat-title">Start a New Conversation</h2>
        <p className="new-chat-subtitle">
          Ask me anything! I can help with coding, explanations, brainstorming, and more.
        </p>
        
        <button className="start-chat-btn" onClick={handleStartChat}>
          <FaPlus /> Start New Chat
        </button>
        
        <div className="suggestion-cards">
          <div className="suggestion-card" onClick={handleStartChat}>
            <p className="suggestion-title">💡 Explain a concept</p>
            <p className="suggestion-text">Ask me to explain React hooks, algorithms, or any topic</p>
          </div>
          
          <div className="suggestion-card" onClick={handleStartChat}>
            <p className="suggestion-title">🔧 Debug code</p>
            <p className="suggestion-text">Share your code and I'll help find and fix issues</p>
          </div>
          
          <div className="suggestion-card" onClick={handleStartChat}>
            <p className="suggestion-title">📚 Learn something new</p>
            <p className="suggestion-text">Get tutorials, examples, and best practices</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewChat