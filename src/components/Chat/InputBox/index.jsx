import { useState } from 'react'
import { FaCircleArrowUp } from "react-icons/fa6";
import './index.css'

const InputBox = (props) => {
  const { onSend, disabled } = props
  const [input, setInput] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput('')
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  
  return (
    <div className="input-box-container">
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type in pure air ..."
          className="message-input"
          rows="2"
          disabled={disabled}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!input.trim() || disabled}
        >
          {disabled ? '⏳' : <FaCircleArrowUp />} Send
        </button>
      </form>
    </div>
  )
}

export default InputBox