import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Slide, ToastContainer,toast} from 'react-toastify'



function App() {

  const {isSignedIn,isLoaded}=useUser()
  if(!isSignedIn && isLoaded){
    return <Navigate to={"/auth/signIn"}/>
  }


  return (
    <div>
      <Header/>
      <Outlet/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
         transition={Slide}
       />

    </div>
  )
}

export default App