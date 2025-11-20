import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const navigate = useNavigate()
  const [conversations, setConversations] = useState([])
  const [currentConversationId, setCurrentConversationId] = useState(null)

  // Load all conversations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('conversations')
    if (saved) {
      setConversations(JSON.parse(saved))
    }
  }, [])

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('conversations', JSON.stringify(conversations))
    }
  }, [conversations])

  // Create a new conversation
  const createNewConversation = () => {
    const newConv = {
      id: `conv_${Date.now()}`,
      title: 'New Chat',
      messages: [
        {
          id: 1,
          role: 'assistant',
          content: 'Hello! How can I help you today?',
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setConversations(prev => [newConv, ...prev])
    setCurrentConversationId(newConv.id)
    navigate(`/chat/${newConv.id}`)
    
    return newConv
  }

  // Get current conversation
  const getCurrentConversation = () => {
    return conversations.find(c => c.id === currentConversationId)
  }

  // Add message to current conversation
  const addMessage = (message) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const updatedMessages = [...conv.messages, message]
        
        // Update title based on first user message
        let newTitle = conv.title
        if (message.role === 'user' && conv.title === 'New Chat') {
          newTitle = message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '')
        }

        return {
          ...conv,
          messages: updatedMessages,
          title: newTitle,
          updatedAt: new Date().toISOString()
        }
      }
      return conv
    }))
  }

  // Update last message (for regenerate)
  const updateLastMessage = (newContent) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const messages = [...conv.messages]
        messages[messages.length - 1] = {
          ...messages[messages.length - 1],
          content: newContent,
          timestamp: new Date().toISOString()
        }
        return { ...conv, messages }
      }
      return conv
    }))
  }

  // Remove last message (for regenerate)
  const removeLastMessage = () => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        return {
          ...conv,
          messages: conv.messages.slice(0, -1)
        }
      }
      return conv
    }))
  }

  // Delete conversation
  const deleteConversation = (id) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    
    // If deleting current conversation, redirect
    if (id === currentConversationId) {
      const remaining = conversations.filter(c => c.id !== id)
      if (remaining.length > 0) {
        navigate(`/chat/${remaining[0].id}`)
      } else {
        navigate('/chat')
      }
    }
  }

  // Get time ago string
  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffMs = now - past
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return past.toLocaleDateString()
  }

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversationId,
        setCurrentConversationId,
        createNewConversation,
        getCurrentConversation,
        addMessage,
        updateLastMessage,
        removeLastMessage,
        deleteConversation,
        getTimeAgo
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}