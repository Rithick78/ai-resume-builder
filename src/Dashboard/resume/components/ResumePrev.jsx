 
 
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import PersonalResumeInfo from './preview/PersonalResumeInfo';
import ExperienceResumeInfo from './preview/ExperienceResumeInfo';
import EducationResumeInfo from './preview/EducationResumeInfo';
import SkillsResumeInfo from './preview/SkillsResumeInfo';

function ResumePrev() {

      const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

  return (
    <div className='bg-gray-50 py-10 border-t-5 border-b-1 mb-10  rounded-lg'style={{borderColor:resumeInfo?.themeColor}} >
      
            <PersonalResumeInfo resumeInfo={resumeInfo}/>
            <ExperienceResumeInfo resumeInfo={resumeInfo}/>
            <EducationResumeInfo resumeInfo={resumeInfo}/>
            <SkillsResumeInfo resumeInfo={resumeInfo}/>
    
    </div>
  )
}

export default ResumePrev