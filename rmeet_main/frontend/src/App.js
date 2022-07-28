import { Routes, Route } from 'react-router-dom';
import Clock from './components/Clock';
import LiveDate from './components/LiveDate';

function App() {
  return (
    <div className='App'>
      <Clock/>
      <LiveDate/>
    </div>
  )
}

export default App
