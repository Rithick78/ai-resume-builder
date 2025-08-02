import React, { useContext } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Color from './../../../assets/color.png'
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../Services/GlobalApi';
import { useParams } from 'react-router-dom';
 
function ThemeColor() {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
  ];


  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
   const {resumeId}=useParams()  

  const onColorChange=(color)=>{
    setResumeInfo({
        ...resumeInfo,
        themeColor:color
    })
      const data={
        data:{
            themeColor:color
        }
      }
     GlobalApi.UpdateResumeDetail(resumeId,data).then(res=>{
          console.log(res)
     })

  }

  return (
    <div> 
         <Popover>
            <PopoverTrigger >
                 <Button className='sm:p-5 sm:text-[17px] text-[12px] p-2' variant='outline'>
                    Theme <img src={Color} className='w-6 h-6'/> 
                 </Button>
            </PopoverTrigger>
            <PopoverContent>
                 <h1 className='mb-5 text-center font-bold '> Select Your Theme Color </h1>
               <div className='grid grid-cols-5 gap-4 ml-3'> 
                {
                    colors.map((item,index)=>(
                        <div 
                         onClick={()=>onColorChange(item)}
                        style={{
                            backgroundColor:item
                        }} className={`h-5 w-5 rounded-full hover:border-2 border-black 
                                      ${resumeInfo?.themeColor==item && 'border-2 border-black'}`}>
                         
                        </div>
                    ))
                }</div>
            </PopoverContent>
         </Popover>
    </div>
  );
}

export default ThemeColor;