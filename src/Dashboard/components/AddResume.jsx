 
import { Loader2, Plus } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import GlobalApi from './../../../Services/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function AddResume() {

    const [openDailog,setOpenDailog]= useState(false);
    const[resumeTitle,setResumeTitle]= useState();
    const {user}= useUser();
    const [loading,setLoading]=useState(false)
    const navigation = useNavigate()

   const onCreate =async()=>{
      setLoading(true)
      const Id =uuidv4();;
      const data ={
        data:{
          title:resumeTitle,
          userId:Id,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          userName:user?.fullName,
        }
      }
    
     GlobalApi.CreateNewResume(data).then(res=>{
        console.log(res.data.data.documentId);
         if(res){
          setLoading(false);
          toast.success('Successfully Created 👍')
          navigation('/dasboard/resume/'+res.data.data.documentId+"/edit")
         }
       },(err) => {
         setLoading(false);
         toast.error('Something Went Wrong 🚫')
       })
       setOpenDailog(false);
    }

  return (
    <div >
         <div onClick={()=>setOpenDailog(true)} className='bg-gray-100 outline-2 outline-offset-4 outline-dashed flex mt-12 rounded-md py-38
                        items-center justify-center hover:scale-102 transition-all hover:shadow-lg'>
            <Plus/>
        </div>
        <Dialog open={openDailog}>
           <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Your Own Resume</DialogTitle>
                  <p className='text-[16px]'>Add a title for your resume</p>
                  <Input required onChange={(e)=>setResumeTitle(e.target.value)} 
                   className='mt-2' placeholder=" Ex. Frontend Resume "  /> 
                <DialogDescription className='flex justify-end mt-2 gap-3'>
    
                      <Button variant='outline' onClick={()=>setOpenDailog(false)}>Cancel</Button>
                      <Button onClick={()=>onCreate()} disabled={!resumeTitle||loading} >
                        
                        {loading?<Loader2 className='animate-spin'/>:"Create"}</Button>
        
                </DialogDescription>
              </DialogHeader>
           </DialogContent>
        </Dialog>
          
    </div>
  )
}

export default AddResume

 

             