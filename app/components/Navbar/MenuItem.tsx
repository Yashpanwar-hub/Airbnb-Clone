'use client';
import React from 'react'

interface MenuItemProps{
    onclick: ()=>void;
    label:string;
}

const MenuItem:React.FC<MenuItemProps> = ({
    onclick,
    label
}) => {
  return (
    
    <div onClick={onclick} className='px-4 py-3 bg-neutral-100 transition font-semibold'>
      {label}
    </div>
  )
}

export default MenuItem
