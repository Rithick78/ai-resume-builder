/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, Minus, Plus } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../Services/GlobalApi'
import { toast } from 'react-toastify'

function EducationDetail() {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [loading, setLoading] = useState(false);
  const [educationDetail, setEducationDetail] = useState([{
    institution: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: '',
  }])
    
  useEffect(()=>{
       resumeInfo && setEducationDetail(resumeInfo?.education)
  },[])

  const handleChange = (index, event) => {
    const newEntries = educationDetail.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationDetail(newEntries);

  }
  const AddEducation = () => {
    setEducationDetail([
        ...educationDetail, {
        institution: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: '',
      }]
    )

  }
  const RemoveEducation = () => {
    setEducationDetail(educationDetail => educationDetail.slice(0, -1))
    
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data:{
      education: educationDetail.map(({ id, ...rest}) => rest )
    }}

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
      console.log(res);
      setLoading(false)
      toast.success('Education Details Saved 👍')
    }, (err) => {
      setLoading(false)
      toast.error('Something Went Wrong 🚫')
    })
  }
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationDetail,
    })
  }, [educationDetail])


  return (
    <div className='sm:border-t-7 border-t-4 border-b-1  border-purple-500 rounded-lg sm:my-10 my-5 mx-1'>
      <div className='sm:mx-5 mx-3 sm:my-10 my-5 space-y-1'>
        <h1 className='font-extrabold sm:text-2xl text-purple-600' > Education </h1>
        <p className='sm:text-[19px] text-[12px]'>Add Your Education </p>
      </div>
      <div className='sm:mb-5'>
        {educationDetail.map((item, index) => (

          <div className='grid grid-cols-2 sm:gap-5 gap-3 sm:mx-5 mx-3 sm:mb-10 ' key={index}>
            <div className=' col-span-2'>
              <label className='sm:text-xs text-[8px] font-bold col-span-2'> Institution Name</label>
              <Input required className=' text-[9px] sm:py-6 sm:px-5 ' name='institution' 
                  defaultValue={item?.institution}
                  onChange={(event) => handleChange(index, event)} />
            </div>
            <div>
              <label className='sm:text-xs text-[8px] font-bold'>Degree Name</label>
              <Input required className=' text-[9px] sm:py-6 sm:px-5 ' name='degree' 
                      defaultValue={item?.degree}
                     onChange={(event) => handleChange(index, event)} />
            </div>
            <div >
              <label className='sm:text-xs text-[8px] font-bold'> Major </label>
              <Input required className=' text-[9px] sm:py-6 sm:px-5 ' name='major' 
                      defaultValue={item?.major}
                     onChange={(event) => handleChange(index, event)} />
            </div>
            <div>
              <label className='sm:text-xs text-[8px] font-bold'>Start Date</label>
              <Input required type='date' className=' text-[9px] sm:py-6 sm:px-5 ' name='startDate' 
                      defaultValue={item?.startDate}
                     onChange={(event) => handleChange(index, event)} />
            </div>
            <div>
              <label className='sm:text-xs text-[8px] font-bold' >End Date </label>
              <Input type='date' className=' text-[9px] sm:py-6 sm:px-5 ' name='endDate' 
                       defaultValue={item?.endStart}
                     onChange={(event) => handleChange(index, event)} />
            </div>
            <div className='col-span-2' >
              <label className='sm:text-xs text-[8px] font-bold '>Summary</label>
              <Textarea className='py-3 px-5' name='description' onChange={(event) => handleChange(index, event)} />
            </div>

          </div>

        ))}
      </div>
<div className='sm:my-5 sm:mx-7 mx-4 flex justify-between  items-center sm:py-0 py-5'>
            <div className='flex gap-2'>
               <Button onClick={AddEducation} className='sm:text-[16px] text-[9px] sm:py-5 ' variant='outline'><Plus className='sm:size-4 size-3' />Add <span className='hidden sm:block'>More Experience</span></Button>
               <Button onClick={RemoveEducation} className='sm:text-[16px] text-[9px] sm:py-5 ' variant='outline'><Minus className='sm:size-4 size-3' /> Remove </Button>
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

export default EducationDetail