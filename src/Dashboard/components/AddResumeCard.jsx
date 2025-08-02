
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, EllipsisVertical, LoaderCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../Services/GlobalApi'
import { toast } from 'react-toastify'


function AddResumeCard({ resume, reFreshData }) {

  const navigation = useNavigate()
  const [openDailog,setOpenDailog]=useState(false)
  const [loading,setLoading]=useState(false)
  

  const HandleDelete =()=>{
    setLoading(true)

    GlobalApi.DeleteResumeId(resume.documentId).then(res=>{
      console.log(res)
      reFreshData()
      setOpenDailog(false)
      toast.error('Deleted Successfully 🗑️')
    })
  }

  return (
    <div className="gap-2 h-86 mt-10 bg-gradient-to-br from-[rgb(243,191,243)] to-[#c26de6] rounded-xl flex flex-col justify-center items-center
                         transition-all hover:scale-102 hover:shadow-purple-500 hover:shadow-lg">
      <div className='relative left-25 bottom-5 px-10 hover:scale-105'>
        <DropdownMenu>
          <DropdownMenuTrigger><EllipsisVertical className='text-white size-8 ' /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigation('/dasboard/resume/' + resume.documentId + "/edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/dasboard/resume/' + resume.documentId + "/edit")}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpenDailog(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h2 class="text-[20px] text-white font-bold mb-2">{resume.title}</h2>
      <p className='text-white border-1 w-45 p-2 rounded-md text-center px-3'>Customize your resume to align with your desired job role.</p>
      <Link to={'/dasboard/resume/' + resume.documentId + "/edit"}>
        <div className='bg-white p-3 rounded-full mt-4 transition-all hover:rotate-45'><ArrowUpRight /></div></Link>
      <AlertDialog open={openDailog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are You Sure You Want To Delete?</AlertDialogTitle>
            <AlertDialogDescription>
              Deleting Your Resume Is Permanent,Once You Done! All Your Data Will Be Permanently Removed 
            </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>setOpenDailog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={HandleDelete}>{loading ? <LoaderCircle className='animate-spin'/> : 'Delete' }</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AddResumeCard