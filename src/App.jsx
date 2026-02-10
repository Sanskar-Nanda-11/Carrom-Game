import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CarromBoard from './components/CarromBoard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className='w-full min-h-screen'>
        <CarromBoard/>
      </main>
    </>
  )
}

export default App
