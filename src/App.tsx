import { useEffect, useRef, useState } from 'react'
import Demo from './components/Demo'
import './App.css'

function App() {
  const [flag, setFlag] = useState(true)
  const [direction, setDirection] = useState('下')
  const [delay, setDelay] = useState('1')
  const lightWrap = useRef<HTMLDivElement>(null)
  let timer = useRef<number>()
  let count: number = 0
  let preCount: number = 0
  const setTimer = (duration: number = 1) => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => {
      const divs = lightWrap.current!.querySelectorAll('div')
      divs.forEach((item, index) => {
        if (index !== count) item.classList.remove('active')
      })
      divs.forEach((item, index) => {
        if(index === count) item.classList.add('active')
      })
      if (count ===2) {
        preCount = count
        count--
        setDirection('上')
      }else if (count === 0) {
        preCount = count
        count++
        setDirection('下')
      } else if (count === 1 && preCount === 2) {
        count--
      } else if (count ===1 && preCount ===0) {
        count++
      }
    }, duration * 1000)
  }
  useEffect(() => {
    setTimer()
  }, [])
  const handleClick = () => {
    setFlag(flag => !flag)
    console.log(preCount, count);
    
    if(flag) {
      clearInterval(timer.current)
    }else {
      if (delay) setTimer(+delay)
      else setTimer()
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(e.target.value)
    if(e.target.value === '') setTimer()
    else setTimer(+e.target.value)
  }
  return (
    <>
      <div className="wrap" ref={lightWrap}>
        <div className="red"></div>
        <div className="yellow"></div>
        <div className="green"></div>
      </div>
      <button onClick={handleClick}>{flag ? '暂停' : '开始'}</button>
      <div className='text-wrap'>
        <span>方向{direction}，时间间隔</span>
        <input type="text" value={delay} onChange={handleChange} />
      </div>
      <Demo />
    </>
  )
}

export default App
