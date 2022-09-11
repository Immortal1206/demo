import { useEffect, useState } from "react"

export default function Demo() {
  const [sum, setSum] = useState(5)
  let timer: number
  useEffect(() => {
    console.log(sum);
    timer = setInterval(() => {
      setSum(sum => sum - 1)
    }, 1000)
    if(sum === 0) clearInterval(timer)
    return () => clearInterval(timer)
  }, [sum])
  return (
    <div>{sum}</div>
  )
}
