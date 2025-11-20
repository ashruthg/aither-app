import { useNavigate } from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";
import './index.css'

const Header = () => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title">Aither ✧</h1>
          <p> Conversations in pure air. </p>
        </div>
        <div className="header-actions">
          <button className="header-btn" title="Settings">
            ⚙️
          </button>
          
          <button 
            className="header-btn logout-btn" 
            onClick={handleLogout}
            title="Logout"
          >
            <LuLogOut />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header