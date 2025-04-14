import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeroEcommerce from './components/heroEcommerce/HeroPage1'
import JuiceHero from './components/heroEcommerce/juicHero/JuiceHero '

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
      <div className='mb-10'>      <HeroEcommerce  />
      </div>
      <div className='mt-20 pt-30 bg-gray-700'>      <JuiceHero />
      </div>
     </div>
    </>
  )
}

export default App
