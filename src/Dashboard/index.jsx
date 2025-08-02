/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import AddResume from "./components/AddResume"
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../Services/GlobalApi'
import AddResumeCard from './components/AddResumeCard'

function Dashboard() {

const {user } = useUser()
const [resumeList,setResumeList]=useState()

useEffect(()=>{
 user && GetResumeList()
},[user])

  const GetResumeList=() => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(res => {
      setResumeList(res.data.data)
    })
  }

  return ( 
    <div>
      <div className='mt-10 sm:mt-15 space-y-2  '>
         <h1 className=' sm:text-4xl font-bold text-3xl sm:text-center sm:mx-10 text-start ml-5' >Create a  <span className=' text-purple-600'> AI-Powered Resume </span>  For Your Next Job Role</h1>
      </div>
      <div className=' lg:gap-5 grid 2xl:grid-cols-5 2xl:mx-40 xl:grid-cols-4 xl:mx-20 lg:grid-cols-3 lg:mx-20 md:mx-30 md:gap-10 sm:grid-cols-2 sm:mx-18 sm:gap-5 grid-cols-1 mx-8'>
         <AddResume/>
         {
          resumeList?.length>0&&resumeList.map((resume,index) =>(
              <AddResumeCard resume={resume} key={index} reFreshData={GetResumeList}/>
           ))}
      </div>
      
    </div>
  )
}

export default Dashboard
