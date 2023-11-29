import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Signin from './Signin'
import Menu from './menu'
import VideoUploadForm from './videoupload'
import VideoList from './videolist'
import VideoPlayer from './Videoplay'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/videos" element={<VideoList />} />
        <Route path="/Signin" element={<Signin />}></Route>
        <Route path="/VideoUpload" element={<VideoUploadForm />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/videos/:id" element={<VideoPlayer />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
