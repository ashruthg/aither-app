import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ChatProvider } from './context/ChatContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import ChatLayout from './pages/ChatLayout'
import NewChat from './pages/NewChat'
import ChatRoom from './pages/ChatRoom'

const App = () => (
  <BrowserRouter>
    <ChatProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/chat' element={<ChatLayout />}>
            <Route index element={<NewChat />} />
            <Route path=':id' element={<ChatRoom />} />
          </Route>
        </Route>
        
        <Route path='*' element={<Navigate to='/chat' replace />} />
      </Routes>
    </ChatProvider>
  </BrowserRouter>
)

export default App