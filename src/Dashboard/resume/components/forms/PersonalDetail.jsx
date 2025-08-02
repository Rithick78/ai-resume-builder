/* eslint-disable react-hooks/exhaustive-deps */


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../Services/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'react-toastify'



function PersonalDetail({enableNext}) {
  
  
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) 
    const[loading,setLoading]=useState(false);
    const [formInfo,setFormInfo]=useState();
    const params =useParams();

    useEffect(()=>{
     console.log(params);
    },[])

  const handleChange =(e)=>{
      enableNext(false)
       const {name,value}=e.target;
       setFormInfo({
            ...formInfo,
            [name]:value
          })
        setResumeInfo({
          ...resumeInfo,
          [name]:value   
   })
  }

  const onSave =(e)=>{
    e.preventDefault();
     setLoading(true)
      const data={
        data:formInfo
      };
    
       
    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
       console.log(res);
       enableNext(true);
       setLoading(false);
       toast.success('Personal Details Saved 👍')
       
       
    },(err)=>{
      enableNext(true);
      setLoading(false);
      toast.error('Something Went Wrong! 🚫')
    })
    
  }
  

  return (
    <div className='sm:border-t-7 border-t-4 border-b-1 border-purple-500 rounded-lg sm:my-10 my-5 mx-1'>
      <div className='sm:mx-5 mx-3 sm:my-10 my-7 space-y-1'>
         <h1 className='font-extrabold sm:text-2xl text-purple-600' > Personal Details</h1>
         <p className='sm:text-[19px] text-[13px]'>Get Start With Some Basic Information</p>
      </div>
      <form  onSubmit={onSave}>
        <div className='sm:mx-5 mx-2 sm:my-10 my-5 grid grid-cols-2 sm:gap-5 gap-2' > 
          <div>
            <label className='sm:text-xs text-[8px] font-bold'>First Name</label>
            <Input  className=' sm:py-6 py-3 sm:px-5 px-3 text-[12px] ' name='firstName' defaultValue={resumeInfo?.firstName} required onChange={handleChange}/>
          </div>
          <div>
            <label className='sm:text-xs text-[8px] font-bold'>Last Name</label>
            <Input className='sm:py-6 py-3 sm:px-5 px-3 text-[12px]' name='lastName' defaultValue={resumeInfo?.lastName} required onChange={handleChange}/>
          </div>
          <div className='col-span-2'> 
            <label className='sm:text-xs text-[8px] font-bold'>Job Title</label>
            <Input className=' sm:py-6 py-3 sm:px-5 px-3 text-[12px]' name='jobTitle' defaultValue={resumeInfo?.jobTitle} required onChange={handleChange}/>
          </div>
          <div className='col-span-2'>
            <label className='sm:text-xs text-[8px] font-bold'>Address</label>
            <Input className=' sm:py-6 py-3 sm:px-5 px-3 text-[12px]' name='address' defaultValue={resumeInfo?.address} required onChange={handleChange}/>
          </div>
          <div>
            <label className='sm:text-xs text-[8px] font-bold'>Email</label>
            <Input className=' sm:py-6 py-3 sm:px-5 px-3 text-[12px]' name='email' defaultValue={resumeInfo?.email} required onChange={handleChange}/>
          </div>
          <div>
            <label className='sm:text-xs text-[8px] font-bold'>Phone</label>
            <Input className=' sm:py-6 py-3 sm:px-5 px-3 text-[12px]' name='phone' defaultValue={resumeInfo?.phone} required onChange={handleChange}/>
          </div> 
          
        </div>
      <div className='flex justify-end sm:mr-7 mr-3 mb-5'>
         {loading ? <Button className='sm:text-[18px] text-[13px] sm:px-8 sm:py-5.5 flex justify-items-end '>
          Saving..<LoaderCircle className='animate-spin'/></Button>: <Button type="submit" 
          disabled={loading} className='sm:text-[18px] text-[12px] sm:px-8 sm:py-5.5 flex justify-items-end '>Save</Button>}
      </div> 
      </form>
    </div>
  )
}

export default PersonalDetail