import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import SummeryDetail from './forms/SummeryDetail'
import ExperienceDetail from './forms/ExperienceDetail'
import EducationDetail from './forms/EducationDetail'
import SkillsDetail from './forms/SkillsDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, ArrowUpLeft, House} from 'lucide-react'
import Color from "./../../../assets/color.png"
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'
import { toast } from 'react-toastify'

function FormSection() {

      const [activeIndex,setActiveIndex]=useState(1);
      const [enableNext,setEnableNext]=useState(false)
      const {resumeId}=useParams()


  return (
    <div className='bg-white rounded-lg  '>

      <div className=' flex  justify-between items-center sm:mx-7 mt-5 mx-3'>
        <div className='flex justify-center items-center sm:gap-5 gap-1'>
          <Link to={'/dashboard'}>
           <Button className='sm:py-6 py-4 rounded-full transition-all hover:-rotate-z-45' variant='outline'><ArrowUpLeft className='sm:size-7 size-3 '/></Button>
          </Link>
          <ThemeColor/>
        </div>
        <div className=' flex justify-center items-center gap-2 '> 
         {activeIndex>1 && <Button onClick={()=>setActiveIndex(activeIndex-1)} className='sm:p-6  p-4 '><ArrowLeft className='sm:size-5.5 size-3'/></Button>} 
         <Button disabled={!enableNext} onClick={()=>setActiveIndex(activeIndex+1)}  className='sm:py-6 sm:text-[16px] text-[9px]'>Next<ArrowRight className='sm:size-5.5 size-3 '/></Button>
        </div>
      </div>
        {activeIndex==1 ? <PersonalDetail enableNext={(e)=>setEnableNext(e)}/> 
              : activeIndex==2 ? <SummeryDetail enableNext={(e)=>setEnableNext(e)}/> 
              : activeIndex==3 ? <ExperienceDetail enableNext={(e)=>setEnableNext(e)}/> 
              : activeIndex==4 ? <EducationDetail enableNext={(e)=>setEnableNext(e)}/> 
              : activeIndex==5 ? <SkillsDetail /> 
              : activeIndex==6 ?  <Navigate to={'/my-resume/'+resumeId+"/view/"}/> : null}
      </div>
  )
}

export default FormSection