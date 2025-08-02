 
import React from 'react'

function SkillsResumeInfo({resumeInfo}) {
  return (
    <div>
         <h1 className='text-center lg:mt-3 mt-2 font-extrabold lg:text-[19px] sm:text-[15px] text-[9px]' style={{ color: resumeInfo?.themeColor }}>Skills</h1>
            <hr className='border-1 my-2 sm:mx-6 mx-4' style={{ borderColor: resumeInfo?.themeColor }} />
            
            <div className='grid grid-cols-3 lg:gap-3 gap-2 sm:mt-4 mt-1 sm:mb-0 -mb-8'> 
                {resumeInfo?.skills.map((skills,index)=>(
                    <div key={index} className='flex justify-center items-center lg:gap-3 sm:gap-2 gap-1'> 
                      <div><p className='font-semibold lg:text-[16px] sm:text-[12px] text-[8px]'>{skills?.name}</p></div>
                      <div className=' hidden sm:block  h-2 bg-grey-100 w-[100px] rounded-4xl'>
                         <div className='h-2 rounded-4xl' 
                               style={{backgroundColor:resumeInfo?.themeColor || 'black',
                                 width:skills?.rate*20}} >
                         </div>
                      </div>
                    </div>

                ))}
            </div>
    </div>
  )
}

export default SkillsResumeInfo