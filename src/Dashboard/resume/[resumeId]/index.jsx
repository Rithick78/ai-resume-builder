 
 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../components/FormSection';
import ResumePrev from '../components/ResumePrev';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../Services/GlobalApi';

function EditResume() {

     const {resumeId} =useParams();
     const [resumeInfo,setResumeInfo]=useState()

     useEffect(()=>{
        GetResumeInfo()
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[]);

     const GetResumeInfo=()=>{

        GlobalApi.GetResumeId(resumeId).then(res=>{
          console.log(res.data.data);
          setResumeInfo(res.data.data)
          
        })

     }
     

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className=' grid grid-cols-1 md:mx-5 xl:mx-2 lg:mx-20 xl:grid-cols-2 xl:gap-2 -gap-1 sm:mx-3'>
      <FormSection />
      <ResumePrev />
    </div>
    </ResumeInfoContext.Provider>
  )
}
export default EditResume
