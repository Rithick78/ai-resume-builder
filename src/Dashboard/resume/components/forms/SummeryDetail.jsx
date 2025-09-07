/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../Services/GlobalApi'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { AIChatSession } from './../../../../../Services/AiService'
import { BtnBold, BtnBulletList, BtnItalic, BtnNumberedList, BtnRedo, BtnUndo, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'react-toastify'




function SummeryDetail({ enableNext }) {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const PROMPT = `Give me a personal summery for  ${JSON.stringify(resumeInfo?.jobTitle)} in 4-5 lines.`
  const [loading, setLoading] = useState(false);
   const [loading2, setLoading2] = useState(false);
  const params = useParams();
  const [summery, setSummery] = useState()
   
 
 

  useEffect(() => {
    summery && setResumeInfo({
      ...resumeInfo,
      summery: summery
    })
  }, [summery])

  const AIGenerateSummery=async()=>{
              setLoading(true)
              console.log(PROMPT);
              const result=await AIChatSession.sendMessage(PROMPT);
              console.log(result.response.text());
              const res = result.response.text();
              setSummery(res)
              setLoading(false)
              toast.info('AI-Generated Summary Ready 🧠')
              }


  const onSave = () => {
    setLoading2(true)
    const data = {
      data: {
        summery:summery
      }
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
      console.log(res);
      enableNext(true);
      setLoading2(false);
      toast.success('Personal Details Saved 👍')

    }, (err) => {
      enableNext(true);
      setLoading2(false);
      toast.error('Something Went Wrong 🚫')
    })

  }


  return (
    <div className='sm:border-t-7 border-t-4 border-b-1 border-purple-500 rounded-lg sm:my-10 my-5 mx-1'>
      <div className='sm:mx-5 mx-3 sm:my-10  my-5 space-y-1'>
        <h1 className='font-extrabold sm:text-2xl text-purple-600 ' > Summary </h1>
        <p className='sm:text-[19px] text-[13px]'>Add Summary For Your Job Role</p>
      </div>
      <div >
                  <div className='flex justify-between mx-2 sm:mb-5 mb-3 items-center'>
                      <label className='font-bold text-purple-600 flex gap-2 sm:text-[16px] text-[13px]'> Summary </label>
                      {loading ? <LoaderCircle className='animate-spin'/> : 
                      <Button type='button' onClick={()=>AIGenerateSummery()} className='sm:text-[14px] sm:w-42 sm:h-10 w-25 h-7 text-[9px]' variant='outline' >
                           🧠 Generate From AI
                      </Button> }
              </div>
                  <EditorProvider>
                      <Editor value={summery} 
                      className='text-[8px] sm:text-[16px] h-30'
                      defaultValue={resumeInfo?.summery}
                       onChange={(e) =>{setSummery(e.target.value)}}>
                          <Toolbar >
                          <Separator />
                          <BtnBold />
                          <BtnItalic />
                          <BtnNumberedList />
                          <BtnBulletList />
                          <BtnUndo />
                          <BtnRedo />
                          </Toolbar>
                          </Editor>
                          </EditorProvider>
              </div>
               <div className='flex justify-end sm:mr-7 mr-3 sm:my-5 my-3'>
                            {loading2 ? <Button type='submit' className='sm:text-[18px] text-[12px] sm:px-8 sm:py-5.5 flex justify-items-end '>
                            Saving..<LoaderCircle className='animate-spin'/></Button>: <Button type='submit' onClick={() => onSave()} 
                            disabled={loading2} className='sm:text-[18px] text-[12px] sm:px-8 sm:py-5.5 flex justify-items-end '>Save</Button>}
                        </div> 
    </div>
  )
}

export default SummeryDetail