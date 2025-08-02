/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Minus, Plus } from 'lucide-react';
import GlobalApi from './../../../../../Services/GlobalApi';
import { toast } from 'react-toastify';

function SkillsDetail() {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()
  const [loading, setLoading] = useState(false);
  const [skillsDetail, setSkillsDetail] = useState([
    {
      name: '',
      rate: '',
    }
  ]);


  useEffect(() => {
    resumeInfo && setSkillsDetail(resumeInfo?.skills)
  }, [])

  const handleChange = (index, name, value) => {
    const newEntries = skillsDetail.slice()
    newEntries[index][name] = value
    setSkillsDetail(newEntries)
  }
  const AddMoreSkill = () => {
    setSkillsDetail([
      ...skillsDetail,
      {
        name: '',
        rate: '',
      }
    ])
  }
  const RemoveSkill = () => {
    setSkillsDetail(skillsDetail => skillsDetail.slice(0, -1))
  }
  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        skills: skillsDetail.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(resumeId, data).then(res => {
      console.log(res);
      setLoading(false)
      toast.success('Skills Details Saved 👍')

    }, (err) => {
      setLoading(false)
      toast.error('Something Went Wrong 🚫')
      toast.warn('You Have To All Details🚫')
    })
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsDetail
    })
  }, [skillsDetail])

  return (
    <div className='sm:border-t-7 border-t-4 border-b-1  border-purple-500 rounded-lg sm:my-10 my-5 mx-1'>
      <div className='sm:mx-5 mx-3 sm:my-10 my-5 space-y-1'>
        <h1 className='font-extrabold sm:text-3xl text-purple-600' > Skills</h1>
        <p className='sm:text-[19px] text-[12px]'>Add Your Professional Skills</p>
      </div>
      {
        skillsDetail.map((item, index) => (
          <div className='flex justify-between items-center sm:mr-20 mx-3 gap-3 my-5' key={index}>
            <div className=''>
              <label className='sm:text-[15px] text-[10px] font-bold'>Skills</label>
              <Input required className=' sm:h-15 sm:text-[16px] text-[11px]' defaultValue={item?.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)} />
            </div>
            <div className='flex justify-center items-center gap-2'>
              <h1 className='sm:text-[18px] text-[12px] font-bold' >Rate:</h1>
              <Rating required style={{ maxWidth: 180 }} value={item.rate}
                defaultValue={item?.rate}
                onChange={(e) => handleChange(index, 'rate', e)} />
            </div>
          </div>
        ))
      }
      <div className='sm:my-7 mb-4 sm:mx-6 mx-4 flex justify-between  items-center'>
        <div className='flex gap-2'>
          <Button onClick={AddMoreSkill} className='sm:text-[16px] text-[10px] sm:py-5' variant='outline'><Plus className='sm:size-4 size-3' />Add <span className='hidden sm:block'>More Experience</span> </Button>
          <Button onClick={RemoveSkill} className='sm:text-[16px] text-[10px] sm:py-5' variant='outline'><Minus className='sm:size-4 size-3' /> Remove </Button>
        </div>
        <div className='flex justify-end sm:mr-7 mr-1 sm:mb-5'>
          {loading ? <Button className='sm:text-[18px] text-[12px] sm:px-8 sm:py-5.5  flex justify-items-end '>
            Saving..<LoaderCircle className='animate-spin' /></Button> : <Button onClick={() => onSave()}
              disabled={loading} className='sm:text-[18px] text-[12px] sm:px-8 sm:py-5.5  flex justify-items-end '>Save</Button>}
        </div>
      </div>

    </div>
  )
}

export default SkillsDetail