import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const Home = lazy(() => import('@/components/Home'))
const Edit = lazy(() => import('@/components/Edit'))
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/edit',
    element: <Edit />
  }
]