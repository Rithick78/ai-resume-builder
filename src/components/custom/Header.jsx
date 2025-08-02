import React from 'react'
import { Button } from '../ui/button'
import Logos from "./../../assets/logo ai.png"
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { House } from 'lucide-react'


function Header() {

    const {isSignedIn}=useUser()

    return (
        <div className='flex justify-between items-center shadow-2xs my-5 pb-3 ' >
            <div className='flex items-center sm:gap-2 sm:ml-10 text-center ml-2 gap-1'>
                <img className='lg:w-12 sm:w-9 w-6' src={Logos} />
                <h1  style={{fontFamily:"Righteous"}} className='2xl:max-lg:font-extrabold 
                2xl:text-[30px] text-purple-600 sm:font-extrabold md:text-2xl sm:text-2xl text-[15px]  '>AI Resume Builder</h1>
            </div>
            {
                isSignedIn ?
                <div className='flex items-center sm:gap-2 sm:mx-10 mr-3 gap-1'>
                   <Link to={'/'}><Button className='hidden sm:block py-4.5 rounded-1 transition-all sm:py-3 ' variant='outline'><House className='size-5 stroke-2 md:size-4 md:h-5 sm:h-5'/>
                    </Button></Link>
                <Link to={'/dashboard'}>
                 <Button variant={"outline"} className='2xl:w-40 2xl:h-10 md:w-25 md:h-9 sm:w-22 w-14 h-7 sm:text-[14px] text-[10px]'>Dashboard</Button>
                </Link>
                 <UserButton />
                </div>  :
              <Link to={'/auth/signIn'}> 
                 <Button className='sm:w-40 sm:mr-10 w-15 h-7 mr-2 sm:text-[14px] text-[10px]'>Sign-In</Button>
            </Link>
            }
            
                
        </div>
    )
}

export default Header


