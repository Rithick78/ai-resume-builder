import Header from '@/components/custom/Header'
import React from 'react'
import FrontPage from './../assets/frontPage.png'
import { Button } from '@/components/ui/button'
import { ArrowRight, Video } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


function Home() {

  const navigation=useNavigate()

  return (
    <div>
      <Header/>
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-1'>
        
        <div className='order-1 md:col-span-2 col-span-1'>
          <div className='flex justify-center items-center mt-5 md:mt-3.5'>
          <div  className='flex flex-col justify-center items-center gap-3 md:gap-1'>
             <h1 className='font-extrabold xl:text-6xl lg:text-5xl 
                    md:text-4xl sm:text-4xl text-[22px] '>Build Your Resume <span className="text-purple-600">With AI</span></h1>
            <p className='font-semibold opacity-70 my-5 2xl:text-[20px] lg:text-[16px] 
            md:text-[14px] sm:text-[13px] sm:mx-0 mx-6 text-center'>Effortlessly Craft a Standout Resume with Our AI-Powered Builder</p>
          </div>
          </div>
          <div className='flex justify-center items-center sm:mt-5 lg:gap-20 md:gap-10 sm:gap-8 gap-5'>
            <Button onClick={()=>navigation('/dashboard')} className=' 2xl:w-30 md:w-25 md:text-[12px] '>Get Started <ArrowRight/></Button>
              <HoverCard>
                  <HoverCardTrigger>
                     <Button variant='outline' className='lg:scale-x-130 scale-x-110'>Watch <Video/></Button>
                  </HoverCardTrigger>
                <HoverCardContent className='text-center text-purple-600 mt-2 '>
                      The video will be updated in the near future.
                </HoverCardContent>
               </HoverCard>
          </div>
         </div>
     
        <div className='order-3 md:order-2 space-y-7 md:mt-15  lg:space-y-4  content-center mx-auto sm:mt-0 sm:mb-10'>

             <p className='border-2 border-purple-600 lg:px-12 text-center lg:mt-15 content-center rounded-3xl font-semibold 2xl:text-[19px] 
                           opacity-75 transition-all hover:shadow-purple-600 hover:shadow-2xl hover:scale-102 xl:w-135 xl:text-[19px] 
                           xl:mx-15 lg:w-110 lg:mx-10 lg:text-[16px] lg:h-60 md:text-[12px] md:w-90 md:py-3 md:mt-9 sm:w-110 md:px-7 w-75 text-[12px] mt-5 p-3'>
              This 🧠 AI-powered resume builder allows users to effortlessly generate tailored resumes for any job role, 
              with support for multiple theme colors. Users can preview, customize, download,
               and even share their resumes instantly—all in one seamless experience.
            </p>
             <Button onClick={()=>navigation('/dashboard')} className=' 3xl:ml-83 xl:ml-50 lg:text-[12px] lg:ml-35 md:ml-25 md:text-[8px] sm:ml-28 ml-12 text-[10px]'>Create Your 🧠 AI-Powered Resume <ArrowRight/> </Button>
        </div>

        <div className='order-2 md:order-3 mt-15  flex justify-center content-center  mx-auto  '>
          <img src={FrontPage} className=' 2xl:w-150 transition-all hover:scale-102 lg:w-120 md:w-90 sm:w-110 lg:mt-10 w-75 -mt-5' />
        </div>
        

      </div>
    </div>
  )
}

export default Home