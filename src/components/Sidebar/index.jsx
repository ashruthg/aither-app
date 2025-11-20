import { useNavigate, useParams } from 'react-router-dom'
import { useChat } from '../../context/ChatContext'
import { IoChatbox } from "react-icons/io5"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaPlus } from "react-icons/fa";
import './index.css'

const Sidebar = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { conversations, createNewConversation, deleteConversation, getTimeAgo } = useChat()

  const handleNewChat = () => {
    createNewConversation()
  }

  const handleDelete = (convId, e) => {
    e.stopPropagation()
    if (window.confirm('Delete this conversation?')) {
      deleteConversation(convId)
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={handleNewChat}>
          <FaPlus /> New Chat
        </button>
      </div>

      <div className="conversations-list">
        <h2 className="conversations-title">Recent Chats</h2>
        
        {conversations.length === 0 ? (
          <p className="no-chats">No conversations yet. Start a new chat!</p>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${conv.id === id ? 'active' : ''}`}
              onClick={() => navigate(`/chat/${conv.id}`)}
            >
              <div className="conversation-content">
                <span className="conversation-icon"> <IoChatbox /> </span>
                <div className="conversation-info">
                  <p className="conversation-title">{conv.title}</p>
                  <p className="conversation-time">{getTimeAgo(conv.updatedAt)}</p>
                </div>
              </div>
              
              <button
                className="delete-btn"
                onClick={(e) => handleDelete(conv.id, e)}
                title="Delete"
              >
                <RiDeleteBin6Line color='red' />
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

export default Sidebar