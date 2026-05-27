import { createBrowserRouter, Navigate } from 'react-router-dom'
import AdminPage from '@/pages/AdminPage'
import SurveyPage from '@/pages/SurveyPage'

const basename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')

export const router = createBrowserRouter(
  [
    { path: '/', element: <SurveyPage /> },
    { path: '/admin', element: <AdminPage /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ],
  { basename },
)
