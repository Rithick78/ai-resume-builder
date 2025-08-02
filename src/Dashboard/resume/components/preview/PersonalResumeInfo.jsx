import React from 'react'

function PersonalResumeInfo({resumeInfo}) {
  return (
    <div > 
      <div className=' flex flex-col justify-center items-center'>
        <h1 className=' font-extrabold lg:text-3xl sm:text-2xl sm:mt-1 -mt-7 text-[12px]'>{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
        <h2 className=' lg:font-bold font-semibold sm:text-[15px] text-[8px]'>{resumeInfo?.jobTitle}</h2>
        <p style={{color:resumeInfo?.themeColor}} className=' font-semibold lg:text-[16px] sm:text-[14px] text-[8px]'>{resumeInfo?.address}</p>
        </div>
        <div className='flex justify-between font-semibold  sm:mx-7 mx-4 lg:text-[16px] sm:text-[14px] text-[8px]' style={{color:resumeInfo?.themeColor}}>
          <p>{resumeInfo?.email}</p>
          <p>{resumeInfo?.phone}</p>
        </div>
        
        <hr className='border-1 my-2 sm:mx-6 mx-4'style={{borderColor:resumeInfo?.themeColor}} /> 
        
         <div className='sm:mx-7 mx-4 lg:my-3 lg:text-[16px] sm:text-[12px] text-[7px]' dangerouslySetInnerHTML={{__html:resumeInfo?.summery}} />
    </div>
  )
}

export default PersonalResumeInfo