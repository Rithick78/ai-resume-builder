/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, Minus, Plus } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import RichPrev from '../RichPrev'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../Services/GlobalApi'
import { toast } from 'react-toastify'

function ExperienceDetail() {

   const [experienceDetail, setExperienceDetail] = useState([{
      position: '',
      company: '',
      city: '',
      state: '',
      startDate: '',
      endDate: ''
   }]);
   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
   const {resumeId} = useParams()
   const [loading, setLoading] = useState(false);

   useEffect(()=>{
      resumeInfo && setExperienceDetail(resumeInfo?.experience)
   },[])

   const handleChange = (index, event) => {
      const newEntries = experienceDetail.slice();
      const { name, value } = event.target;
      newEntries[index][name] = value;
      setExperienceDetail(newEntries);
   }
   const AddResume = () => {
      setExperienceDetail([
       ...experienceDetail,{    
       position: '',
       company: '',
       city: '',
       state: '',
       startDate: '',
       endDate: '',
      }])
   }

   const RemoveResume = () => {
      setExperienceDetail(experienceDetail=>experienceDetail.slice(0,-1))
    };

   
   const handleRichPrev = (event,name,index) => {
      const newEntries = experienceDetail.slice()
      newEntries[index][name] = event.target.value
      setExperienceDetail(newEntries)
   }


   const onSave = () => {
      setLoading(true)
      const data = {
         data:{
         experience:experienceDetail.map(({ id, ...rest}) => rest )
      }}
      
      GlobalApi.UpdateResumeDetail(resumeId,data).then(res => {
         console.log(res);
         setLoading(false)
         toast.success('Experience Details Saved 👍')

      }, (err) => {
         setLoading(false)
         toast.error('Something Went Wrong 🚫')
      })
   }

   useEffect(() => {
       setResumeInfo({
         ...resumeInfo,
         experience: experienceDetail
      })

       
   }, [experienceDetail])


   return (
      <div className='sm:border-t-7 border-t-4 border-b-1  border-purple-500 rounded-lg sm:my-10 my-5 mx-1'>
         <div className='sm:mx-5 mx-3 sm:my-10 my-5 space-y-1'>
            <h1 className='font-extrabold sm:text-2xl text-purple-600' > Professional Experience  </h1>
            <p className='sm:text-[19px] text-[13px]'>Add Experience Of Your Previous Company</p>
         </div>

            {experienceDetail.map((item,index) => (
               <div key={index}>
               <div className='grid grid-cols-2 sm:gap-5 gap-3 sm:mx-5 mx-3 sm:mb-10 ' >
                  <div >
                     <label className='sm:text-xs text-[8px] font-bold'> Position Title</label>
                     <Input required className='text-[9px] sm:py-6 sm:px-5 ' name='position' 
                            defaultValue={item?.position}
                            onChange={(event) => handleChange(index,event)} />
                  </div>
                  <div>
                     <label className='sm:text-xs text-[8px] font-bold'>Company Name</label>
                     <Input required className='text-[9px] sm:py-6 sm:px-5 ' name='company' 
                            defaultValue={item?.company}
                            onChange={(event) => handleChange(index,event)} />
                  </div>
                  <div>
                     <label className='sm:text-xs text-[8px] font-bold' >City</label>
                     <Input required className='text-[9px] sm:py-6 sm:px-5 ' name='city' 
                            defaultValue={item?.city}
                            onChange={(event) => handleChange(index,event)} />
                  </div>
                  <div>
                     <label className='sm:text-xs text-[8px] font-bold'>State</label>
                     <Input required className='text-[9px] sm:py-6 sm:px-5 ' name='state' 
                            defaultValue={item?.state}
                            onChange={(event) => handleChange(index,event)} />
                  </div>
                  <div>
                     <label className='sm:text-xs text-[8px] font-bold'>Start Date</label>
                     <Input required type='date' className='text-[9px] sm:py-6 sm:px-5 ' name='startDate'
                            defaultValue={item?.startDate}
                            onChange={(event) => handleChange(index,event)} />
                  </div>
                  <div>
                     <label className='sm:text-xs text-[8px] font-bold' >End Date / Working <span className='font-normal'>(Leave it)</span></label>
                     <Input type='date' className='text-[9px] sm:py-6 sm:px-5 ' name='endDate' 
                            defaultValue={item?.endDate}
                            onChange={(event) => handleChange(index,event)} />
                  </div>
                  <div className='col-span-2'>
                     <RichPrev index={index} defaultValue={item?.description}
                            onRichPrev={(event) => handleRichPrev(event,'description',index)} />
                  </div>
               </div>
               </div>
            ))}

         <div className='sm:my-5 sm:mx-7 mx-4 flex justify-between  items-center sm:py-0 py-5'>
            <div className='flex gap-2'>
               <Button onClick={AddResume} className='sm:text-[16px] text-[9px] sm:py-5 ' variant='outline'><Plus className='sm:size-4 size-3' />Add <span className='hidden sm:block'>More Experience</span></Button>
               <Button onClick={RemoveResume} className='sm:text-[16px] text-[9px] sm:py-5 ' variant='outline'><Minus className='sm:size-4 size-3' /> Remove </Button>
            </div>
         <div className='flex justify-end sm:mr-7 mr-2 sm:mb-5'>
              {loading ? <Button className='sm:text-[18px] text-[12px] sm:px-8 sm:py-5.5  flex justify-items-end '>
              Saving..<LoaderCircle className='animate-spin'/></Button>: <Button onClick={() => onSave()} 
              disabled={loading} className='sm:text-[18px] text-[12px] sm:px-8 sm:py-5.5  flex justify-items-end '>Save</Button>}
          </div> 
         </div>
      </div>
   )
}

export default ExperienceDetail