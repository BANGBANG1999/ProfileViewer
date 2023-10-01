
import './App.css'
import {useState} from "react"
import LoadingBar from 'react-top-loading-bar'
import UserList from './components/UserList'

function App() {

  const [progress, setProgress] = useState(0)

  return (
    <>
      <div className="container">
      <LoadingBar
        color='#f11946'
        progress={progress}
        // progress={40}
        height={3}
      />
        <UserList progress={progress} setProgress={setProgress}/>
      </div>

    </>
  )
}

export default App
