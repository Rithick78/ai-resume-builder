import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './auth/signIn'
import Dashbroad from './Dashboard'
import Home from './home'
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-react'
import EditResume from './Dashboard/resume/[resumeId]'
import ViewResume from './my-resume/[resumeId]'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashbroad />
      },
      {
        path:'/dasboard/resume/:resumeId/edit',
        element: <EditResume/>
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/signIn/',
    element: <SignIn />
  },
  {
    path: '/my-resume/:resumeId/view/',
    element: <ViewResume/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkLoaded>
      <RouterProvider router={router} />
    </ClerkLoaded>
    </ClerkProvider>
  </StrictMode>
);
