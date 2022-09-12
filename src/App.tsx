import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from '@/router'
import './App.css'

export default function App() {
  return (
    <Suspense fallback={<h1>loading</h1>}>
      { useRoutes(routes) }
    </Suspense>
  )
}

