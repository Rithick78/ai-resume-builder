/* eslint-disable react-hooks/exhaustive-deps */
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePrev from '@/Dashboard/resume/components/ResumePrev'
import { Download, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../Services/GlobalApi'
import { RWebShare } from 'react-web-share'
import { toast } from 'react-toastify'

function ViewResume() {

  const [resumeInfo,setResumeInfo]=useState()
  const {resumeId}=useParams();

  useEffect(()=>{
      GetResumeInfo()
  },[])

  const GetResumeInfo =()=>{
    GlobalApi.GetResumeId(resumeId).then(res=>{
      console.log(res.data.data)
      setResumeInfo(res.data.data)
    })
  }

  const HandleDownload =()=>{
     window.print()
    
  }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div id='no-print'>
      <Header/>
      <div >
        <div className=' flex justify-center items-center flex-col gap-5 sm:ml-7 ml-3 '>
          <h1 className='font-extrabold xl:text-3xl lg:text-2xl md:text-[18px] text-purple-600  '>Congrats! Your resume has been successfully created using AI. 🎉</h1>
          <p className='font-mono opacity-70 xl:text-[18px] lg:text-[16px] sm:text-[12px] text-[9px] '>You can download your resume and share a unique URL with others easily. 💼📤</p>
           <div className='flex xl:gap-80 lg:gap-60 sm:gap-25 sm:mb-10 mb-5 lg:mr-10 sm:mr-8 mr-6 '>
          <Button variant='outline' className='sm:text-[17px] text-[10px] mr-15 ' onClick={HandleDownload} >Download <Download className='size-3'/></Button>
            
            <RWebShare
        data={{
          text: "Hello This my AI generated resume.",
          url:import.meta.env.VITE_BASE_URL/'my-resume/'+ resumeId+'/view',
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" "+'AI Resume',
        }}
             onClick={() => console.log("shared successfully!")}>
           <Button variant='outline' className='sm:text-[17px] text-[10px]' >Share <Send className='size-3'/></Button>
           </RWebShare>
         </div>
        </div>
       </div>
      </div>
      <div id='to-print' className=''>
          <ResumePrev/>
     </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume