import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useChat } from '../../context/ChatContext'
import MessagesList from '../../components/chat/MessagesList'
import InputBox from '../../components/Chat/InputBox'
import { sendMessageToAI } from '../../services/groqApi'
import './index.css'

const ChatRoom = () => {
  const { id } = useParams()
  const {
    conversations,
    setCurrentConversationId,
    getCurrentConversation,
    addMessage,
    removeLastMessage
  } = useChat()
  
  const [isTyping, setIsTyping] = useState(false)
  
  // Set current conversation ID when component mounts or ID changes
  useEffect(() => {
    setCurrentConversationId(id)
  }, [id, setCurrentConversationId])
  
  const currentConv = getCurrentConversation()
  const messages = currentConv?.messages || []
  
  const handleSendMessage = async (text) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    }
    
    addMessage(userMessage)
    setIsTyping(true)
    
    try {
      // Get AI response
      const aiResponse = await sendMessageToAI([...messages, userMessage])
      
      // Add AI message
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      }
      
      addMessage(aiMessage)
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }
      addMessage(errorMessage)
    } finally {
      setIsTyping(false)
    }
  }
  
  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content)
    alert('✅ Copied to clipboard!')
  }
  
  const handleRegenerateResponse = async () => {
    removeLastMessage()
    
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find(m => m.role === 'user')
    
    if (lastUserMessage) {
      setIsTyping(true)
      try {
        const aiResponse = await sendMessageToAI(messages.slice(0, -1))
        const aiMessage = {
          id: Date.now(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString()
        }
        addMessage(aiMessage)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsTyping(false)
      }
    }
  }
  
  if (!currentConv) {
    return (
      <div className="chatroom-loading">
        <p>Loading conversation...</p>
      </div>
    )
  }
  
  return (
    <div className="chatroom">
      <MessagesList
        messages={messages}
        onCopy={handleCopyMessage}
        onRegenerate={handleRegenerateResponse}
        isTyping={isTyping}
      />
      <InputBox
        onSend={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  )
}

export default ChatRoom