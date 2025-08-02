 
import React from 'react'

function ExperienceResumeInfo({ resumeInfo }) {
    return (
        <div>
            <h1 className='text-center lg:mt-3 mt-2 lg:text-[19px] font-extrabold sm:text-[15px] text-[9px]' style={{ color: resumeInfo?.themeColor }}>Professional Experience</h1>
            <hr className='border-1 my-2 sm:mx-6 mx-4' style={{ borderColor: resumeInfo?.themeColor }} />
            <div className='space-y-3'> 
                
            
            {resumeInfo?.experience.map((experience, index) => (
                    <div key={index} >
                        <div className='flex justify-between items-center sm:mx-7 lg:space-y-2 mx-4'>
                            <div>
                                <h1 className='font-extrabold lg:text-[16px] sm:text-[13px] text-[8px]' style={{ color: resumeInfo?.themeColor }}>{experience.position}</h1>
                                <h2 className='font-semibold lg:text-[16px] sm:text-[12px] text-[7px]'>{experience.company&&experience.company+','} {experience.city&&experience.city+',' } {experience.state}</h2>
                            </div>
                            <div><p className='font-semibold lg:text-[16px] sm:text-[13px] text-[7px]' style={{ color: resumeInfo?.themeColor }}>{experience.startDate} - 
                               {experience.endDate || 'Present' }</p></div>
                        </div>
                    
                       <div className='sm:mx-8 mx-5 lg:text-[16px] sm:text-[12px] text-[7px]' dangerouslySetInnerHTML={{__html:experience?.description}} />

                    </div>

                ))}</div>
        </div>
    )
}

export default ExperienceResumeInfo