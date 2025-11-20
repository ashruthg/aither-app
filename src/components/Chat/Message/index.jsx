import './index.css'
import { MdContentCopy } from "react-icons/md";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";

const Message = ({ message, onCopy, onRegenerate }) => {
  const isUser = message.role === 'user'
  
  return (
    <div className={`message-wrapper ${isUser ? 'user-message' : 'ai-message'}`}>
      <div className="message-bubble">
        <div className="message-content">
          {message.content}
        </div>
        
        {!isUser && (
          <div className="message-actions">
            <button 
              className="action-btn" 
              onClick={() => onCopy(message.content)}
              title="Copy"
            >
              <MdContentCopy />
            </button>
            <button 
              className="action-btn" 
              onClick={onRegenerate}
              title="Regenerate"
            >
              <PiArrowsCounterClockwiseBold />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Message