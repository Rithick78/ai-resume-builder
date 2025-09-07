import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnNumberedList, BtnRedo, BtnUndo, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../Services/AiService';
import { toast } from 'react-toastify';



function RichPrev({ onRichPrev, index, defaultValue }) {


    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [value, setValue] = useState(defaultValue);
    const [loading, setLoading] = useState(false)
    const PROMPT = `Create a personal work experience summery for ${JSON.stringify(resumeInfo?.experience[index]?.position)} in 5 to 7 lines.`

    const AIGenerateSummery = async () => {
        setLoading(true)
        if (!resumeInfo.experience[index]?.position) {
            toast.warn('Enter the Job Title 🚫')
            return;
        }
        console.log(PROMPT);
        const result = await AIChatSession.sendMessage(PROMPT);
        console.log(result.response.text());
        const res = result.response.text();
        setValue(res)
        setLoading(false)
        toast.info('AI-Generated Experience Ready 🧠')
    }

    return (
        <div >
            <div className='flex justify-between mx-2 sm:mb-5 mb-3 items-center'>
                <label className='font-bold text-purple-600 flex gap-2 sm:text-[16px] text-[13px]'> Summary </label>
                {loading ? <LoaderCircle className='animate-spin' /> :
                    <Button type='button' onClick={() => AIGenerateSummery()} className='sm:text-[14px] sm:w-42 sm:h-10 w-25 h-7 text-[9px]' variant='outline' >
                        🧠 Generate From AI
                    </Button>}
            </div>
            <EditorProvider >
                <Editor value={value} className='text-[8px] sm:text-[16px]' onChange={(e) => {
                    setValue(e.target.value)
                    onRichPrev(e)
                }}>
                    <Toolbar>
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
    )
}

export default RichPrev