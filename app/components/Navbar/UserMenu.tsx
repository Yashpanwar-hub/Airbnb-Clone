'use client';
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/useRegiserModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
interface userMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<userMenuProps> = ({
  currentUser
}) => {
  const router = useRouter()
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsopen] = useState(false);
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsopen((value) => !value)
  },
    [],
  )
  const onRent = useCallback(()=>{
    if(!currentUser){
      return loginModal.onOpen();
        }
        rentModal.onOpen();
  },[currentUser,loginModal,rentModal])  

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div onClick={onRent} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
          Airbnb your home
        </div>
        <div onClick={toggleOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 bg-white top-1/2 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem onclick={()=>router.push("/trips")} label='My trips' />
                <MenuItem onclick={()=>router.push("/favorites")} label='My favorites' />
                <MenuItem onclick={()=>router.push("/reservations")} label='My reservations' />
                <MenuItem onclick={()=>router.push("/properties")} label='My properties' />
                <MenuItem onclick={rentModal.onOpen} label='Airbnb my home' />
                <MenuItem onclick={()=>signOut()} label='Logout' />
              </>
            ) : (
              <>
                <MenuItem onclick={loginModal.onOpen} label='login' />
                <MenuItem onclick={registerModal.onOpen} label='Sign up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
