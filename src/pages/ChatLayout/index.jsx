import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'
import './index.css'

const ChatLayout = () => {
  return (
    <div className="chat-layout">
      <Header />
      <div className="chat-main">
        <Sidebar />
        <div className="chat-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ChatLayout