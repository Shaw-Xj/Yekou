import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Posts from './pages/Posts'
import Editor from './pages/Editor'
import Media from './Media'
import Settings from './Settings'

export default function App() {
  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/edit/:slug?" element={<Editor />} />
        <Route path="/media" element={<Media />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}