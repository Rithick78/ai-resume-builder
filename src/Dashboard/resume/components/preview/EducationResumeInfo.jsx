 
 
import React from 'react'

function EducationResumeInfo({resumeInfo}) {
  return (
    <div>
        <h1 className='text-center lg:mt-3 mt-2 font-extrabold lg:text-[19px] sm:text-[15px] text-[9px]' style={{ color: resumeInfo?.themeColor }}>Education</h1>
        <hr className='border-1 my-2 sm:mx-6 mx-4' style={{ borderColor: resumeInfo?.themeColor }} />
        
        <div>
            {resumeInfo?.education.map((education,index)=>(
                <div key={index}>

                   <div className='flex space-y-1 sm:space-y-2 justify-between items-center sm:mx-7 mx-4'>
                    <div>
                      <h1 className='font-extrabold lg:text-[16px] sm:text-[13px] text-[8px]' style={{ color: resumeInfo?.themeColor }}>{education?.institution}</h1>
                      <h2 className='font-semibold lg:text-[16px] sm:text-[12px] text-[7px]'>{education?.degree}{education?.major && ' in '+education?.major}</h2>
                    </div>
                    <div><p className='font-semibold lg:text-[16px] sm:text-[13px] text-[7px]' style={{ color: resumeInfo?.themeColor }}>{education?.startDate} - {education?.currentlyWorking ? 'Present' : education?.endDate}</p></div>
                   </div>
                   <p className='sm:mx-8 mx-4 lg:text-[16px] sm:text-[12px] text-[7px]'>{education?.description}</p>

                </div>
            ))}

        </div>
   
   
    </div>

  )
}

export default EducationResumeInfo